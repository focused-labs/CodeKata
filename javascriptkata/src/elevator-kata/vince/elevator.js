{
    init: function init(elevators, floors) {
        // elevator
        // its on 0
        // pressed 2 button
        // if load factor 0, grab the nearest passenger
        // always go to the farthest, and stop along the way to drop off
        // when going to floor, stop at floors if matching direction is on that floor
        //

        elevators[0].goToFloor(3);

        var floorUpQueue = [];
        var floorDownQueue = [];

        function removeNumFromArray(array, num) {
            for (let i = 0; i < array.length; i++) {
                if (array[i] === num) {
                    array.splice(i, 1);
                }
            }
        }

        function getFloorQueue() {
            return floorDownQueue.concat(floorDownQueue);
        }

        function goToNearestPassenger(elevator) {
            let targetFloor = 0;
            let minimumDistance = 100;
            getFloorQueue().forEach((floorNum) => {
                const distance = Math.abs(elevator.currentFloor() - floorNum);
                if (distance < minimumDistance) {
                    targetFloor = floorNum;
                    minimumDistance = distance
                }
            })
            elevator.goToFloor(targetFloor)
        }

        floors.forEach((floor) => {
            floor.on("up_button_pressed", function () {
                floorUpQueue.push(floor.floorNum())
            });
            floor.on("down_button_pressed", function () {
                floorDownQueue.push(floor.floorNum())
            });
        })

        elevators.forEach((elevator) => {
            elevator.on("idle", function () {
                goToNearestPassenger(elevator);
            });
            elevator.on("floor_button_pressed", function(floorNum) {
               elevator.goToFloor(floorNum);
            });
            elevator.on("stopped_at_floor", function (floorNum) {
                removeNumFromArray(floorUpQueue, floorNum);
                removeNumFromArray(floorDownQueue, floorNum)
            });
        })
    }
,
    update: function update(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}