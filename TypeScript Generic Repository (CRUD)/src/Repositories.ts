import {BaseRepository} from "./BaseRepository.js";
import {Booking, Course, User} from "./models.js";

export class UserRepository extends BaseRepository <User>{
    constructor(){
        super([
            {id:"1",name:"Balian",email:"Balain@example.com"},
            {id:"2",name:"Joan",email:"JoanDeArch@example.com"}
        ]);

    }
}
export class CourseRepository extends BaseRepository<Course>{
    constructor() {
        super([
            { id: '1', title: 'Math 101', description: 'Basic Math' },
            { id: '2', title: 'Physics 201', description: 'Advanced Physics' }
        ]);

    }

}

export class BookingRepository extends BaseRepository<Booking>{
    constructor() {
        super([
            { id: '1', userId: '1', courseId: '2', date: '2025-07-01' },
            { id: '2', userId: '2', courseId: '1', date: '2025-07-02' }
        ]);
    }
}
