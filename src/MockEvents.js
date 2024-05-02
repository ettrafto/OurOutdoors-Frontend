const mockEvents = [
    {
        id: 'e1',
        authorId: 'u1',
        authorName: 'humaen',
        sportId: 'Mountain Biking',
        title: 'Bolton Potholes',
        description: 'I am going to Bolton Potholes at 9am to do the sunrise trail, I have 3 seats in my car and a bike rack!',
        imageUrl: '',
        datetime: '4/20/24 4:00pm',
        address: '1 Bolton Valley Access Rd, Bolton, VT 05676', 
        participants: ['u2','u3','u4'],
        comments: {
            comments: [
                'i love mountain biking',
                'im pumped',
                'ill be there'
            ]
        },
        likes: {
            likes: [
                'u2','u3','u4'
            ]
        }
    },
    {
        id: 'e2',
        authorId: 'u1',
        authorName: 'humaen',
        sportId: 'Mountain Biking',
        title: 'Perry Hill',
        description: 'Join us for a challenging ride at Perry Hill. We leave at noon.',
        imageUrl: '',
        datetime: '5/15/24 12:00pm',
        address: 'Waterbury, VT 05676',
        participants: ['u5', 'u6'],
        comments: {
            comments: [
                'Sounds like a great challenge!',
                'Hope the weather holds up.'
            ]
        },
        likes: {
            likes: [
                'u5', 'u6'
            ]
        }
    },
    {
        id: 'e3',
        authorId: 'u2',
        authorName: 'trailrunner',
        sportId: 'Mountain Biking',
        title: 'Night Rides at Saxon Hill',
        description: 'Night riding fun! Lights required. Meeting at 8pm.',
        imageUrl: '',
        datetime: '4/25/24 8:00pm',
        address: 'Essex, VT 05452',
        participants: ['u1', 'u7', 'u8'],
        comments: {
            comments: [
                'First night ride, can’t wait!',
                'See you all there.'
            ]
        },
        likes: {
            likes: [
                'u7', 'u8'
            ]
        }
    },
    {
        id: 'e4',
        authorId: 'u3',
        authorName: 'bikerJoe',
        sportId: 'Mountain Biking',
        title: 'Family Fun Ride',
        description: 'Family-friendly ride through the local park. Kids welcome.',
        imageUrl: '',
        datetime: '6/10/24 10:00am',
        address: 'Maple Street Park, Essex Junction, VT 05452',
        participants: ['u2', 'u9', 'u10'],
        comments: {
            comments: [
                'Perfect for my little ones!',
                'Thanks for organizing this.'
            ]
        },
        likes: {
            likes: [
                'u9', 'u10'
            ]
        }
    },
    {
        id: 'e5',
        authorId: 'u4',
        authorName: 'pedalPusher',
        sportId: 'Mountain Biking',
        title: 'Gravel Grinder 50k',
        description: 'Gravel grinding event covering 50 kilometers. Bring hydration!',
        imageUrl: '',
        datetime: '7/05/24 6:30am',
        address: 'Shelburne, VT',
        participants: ['u3', 'u1'],
        comments: {
            comments: [
                'Ready to grind it out!',
                'My first gravel event, excited!'
            ]
        },
        likes: {
            likes: [
                'u3', 'u1'
            ]
        }
    }
];

export default mockEvents;