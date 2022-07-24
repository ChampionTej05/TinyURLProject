import FlakeGenId from 'flake-idgen';
// class FlakeGenIDGenerator {
//     constructor() {
//         if (FlakeGenIDGenerator._instance) {
//             return FlakeGenIDGenerator._instance
//         }
//         // FlakeGenIDGenerator._instance = this;
//         const object = new FlakeGenId();


//     }
// }

class FlakeGenIDGenerator {

    constructor() {
        if (!FlakeGenIDGenerator.instance) {
            FlakeGenIDGenerator.instance = new FlakeGenId();
        }

    }

    static getInstance() {
        return FlakeGenIDGenerator.instance;
    }
}

export default FlakeGenIDGenerator;