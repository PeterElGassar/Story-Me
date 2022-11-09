

export interface IDiploma {
    id: number,
    name: string
    description: string,
    img_path: string,

    price_before_discount: 0.00,
    price_after_discount: 0.00,
    courses_number: number,
    rate_instructor: number,

    img: string,
    created_at: string,
}

// {
//     "id": 1,
//     "name": "fdgdsfgser",
//     "description": "uhdsugsd",
//     "courses_number": 3,
//     "price_before_discount": 600,
//     "price_after_discount": 900.5,
//     "img": "Diploma-606da5f50a64b.jpg",
//     "created_at": "2021-04-07T12:30:45.000000Z",
//     "updated_at": "2021-04-07T12:30:45.000000Z",
//     "img_path": "http://127.0.0.1:8000/uploads/Diplomas/Diploma-606da5f50a64b.jpg"
// }