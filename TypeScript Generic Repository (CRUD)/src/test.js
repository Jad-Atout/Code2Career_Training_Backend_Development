import { BookingRepository, CourseRepository, UserRepository } from "./Repositories";
async function main() {
    const userRepo = new UserRepository();
    const courseRepo = new CourseRepository();
    const bookingRepo = new BookingRepository();
    console.log("<===========User===========>");
    console.log(await userRepo.getAll());
    console.log(await userRepo.getById("1"));
    console.log(await userRepo.create({ id: '3', name: 'Jad', email: 'jad@example.com' }));
    console.log(await userRepo.update('1', { name: 'John Doe' }));
    console.log(await userRepo.find({ name: 'Balian' }));
    console.log(await userRepo.delete('2'));
    console.log('<===========Courses===========>');
    console.log(await courseRepo.getAll());
    console.log('<===========Bookings===========>');
    console.log(await bookingRepo.getAll());
}
main();
