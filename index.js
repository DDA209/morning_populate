const mongoose = require('mongoose');
const Address = require('./models/Address');
const Student = require('./models/Student');

(async function() {
    /* connection à la base */
    await mongoose.connect(`mongodb://localhost:27017/mongoose_populate`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // console.log('connection au port 27017 :', connect);

    ///// Du code en veux tu en voilà
    const address = new Address({
        streetName: 'Rue de la Plage',
        streetNumber: '25',
        postCode: '99230',
        city: 'Océanville'
    });

    let studentId = ''

    await address.save((err, address) => {

        if (err !== null) {
            console.log('address save err', err);
            return
        };
        console.log('address', address);

        const addressId = address._id;
        console.log('addressId', addressId, ':', addressId === address._id);

        const student = new Student({
            firstName: 'Eblou',
            surname: 'Litu',
            address: addressId
        });

        student.save((err, student) => {
            if (err !== null) {
                console.log('Student save err', err);
                return;
            };
            console.log('student', student);

            studentId = student._id;
            console.log('studentId', studentId, ':', studentId === student._id);

            Student
            .findById(studentId, (err, student) => {
                if (err !== null) {
                    console.log('find student id err', err);
                    return;
                }
                console.log('Student findById', studentId, ':' ,student)
            })
            .populate('address')
            .exec((err, student) => {
                if (err !== null) {
                    console.log('populate Student err', err);
                    return;
                }
                console.log('Student result :', student)
            });

        });

    });
        
})()

console.log('Bloup');
    
/* déconnection de la base */
setTimeout(() =>{
    const disconnect = mongoose.connection.close();
    console.log('Déconnection de la base :', disconnect);
}, 5000)
