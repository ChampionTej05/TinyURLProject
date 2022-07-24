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


    }

    static getInstance() {
        if (!FlakeGenIDGenerator.instance) {
            FlakeGenIDGenerator.instance = new FlakeGenId();
            return FlakeGenIDGenerator.instance;
        }
        return FlakeGenIDGenerator.instance;

    }
}

export default FlakeGenIDGenerator;