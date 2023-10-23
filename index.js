const express = require('express');
const cors = require('cors');
const path = require('path');
const handlebars  = require('express-handlebars');
const config = require('./config');
const email = require('emailjs');
const handlebarsHelpers = require('./helpers/handlebar_helper');


const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cors());

app.set('view engine', 'hbs');

app.engine('hbs', handlebars.engine({
    layoutsDir:__dirname+'/views/layouts',
    //new configuration parameter
    partialsDir: __dirname + '/views/partials/',
    extname: 'hbs',
    helpers: handlebarsHelpers,
}));

app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname+'/public'));



// app.get("/", function(req, res){

//     const futureDate             = new Date( "sept 21,2023 10:00:00" ).getTime();
//     const currentDate            = new Date().getTime();
//     const timeDiffInMilliseconds = futureDate - currentDate;
//     const millisecondsPerSecond  = 1000;
//     const millisecondsPerMinute  = millisecondsPerSecond * 60; // 1000 * 60
//     const millisecondsPerHour    = millisecondsPerMinute * 60; // 1000 * 60 * 60
//     const millisecondsPerDay     = millisecondsPerHour   * 24; // 1000 * 60 * 60 * 24

//     const days = Math.floor( timeDiffInMilliseconds / millisecondsPerDay );

//     const timeDiffInLessThan1Day = timeDiffInMilliseconds % millisecondsPerDay;
//     const hours = Math.floor( timeDiffInLessThan1Day / millisecondsPerHour );

//     const timeDiffInLessThan1Hour = timeDiffInMilliseconds % millisecondsPerHour;
//     const minutes = Math.floor( timeDiffInLessThan1Hour / millisecondsPerMinute );

//     const timeDiffInLessThan1Minute = timeDiffInMilliseconds % millisecondsPerMinute;
//     const seconds = Math.floor( timeDiffInLessThan1Minute / millisecondsPerSecond );

//     res.render("comingsoon", {layout: 'index-cms', days:days, hours:hours, minutes:minutes,seconds})
// });

app.get("/", function(req, res) {
    const bestOffer = services.slice(0,3);
    res.render("home",{layout: 'index', services, settings, homeSlider, testimonials, bestOffer})
})

app.get("/services", function (req, res) {
    res.render('services', {layout: 'index',services, settings})
})

app.get("/service/:id", function (req, res) {
    
    const id = req.params.id;
    const service = services.find(service => service.id == id);

    res.render('service', {layout: 'index',services, settings,service})
})

app.post("/contact-us", function (req, res) {
    var data = req.body;
    var result = ''
    const id = req.params.id;

    const service = services.find(service => service.id == id);
    
    data.message = 
    `${data.message}
    
    USER INFORMATION:
    Name: ${data.name}
    EMAL: ${data.email}
    PHONE:${data.phone}
    `

    try {
        
        console.log("data received "+ data.message);

        var server = email.server.connect({
            user: config.email,
            password: config.email_pass,
            host: config.email_smtp,
            tls: true,
            port: 587 
          });

          server.send({
            text: data.message,
            from: data.email,
            to: config.email,
            cc: '',
            subject: data.subject
          }, function (err, message) {
            if(err !== null){
               console.log(err || message);
               result = (JSON.stringify(err.message));
            }else{
                console.log(message) 
                result = (JSON.stringify("Success"));
            }
          });
   } catch (error) {
    result = 'Something went wrong!';
    }
    res.render('service', {layout: 'index',services, settings,service})
})

app.get("/about", function (req, res) {
    res.render('about', {layout: 'index',services, settings, team})
})

app.get("/contact", function (req, res) {
    res.render('contact', {layout: 'index',services,settings})
})

app.post("/contact", function (req, res) {

    var data = req.body;
    var result = ''

    data.message = 
    `${data.service}
    
    USER INFORMATION:
    Name: ${data.name}
    EMAL: ${data.email}
    PHONE:${data.phone}

    `

    try {
        
        console.log("data received "+ data.message);

        var server = email.server.connect({
            user: config.email,
            password: config.email_pass,
            host: config.email_smtp,
            tls: true,
            port: 587
          });

          server.send({
            text: data.message,
            from: data.email,
            to: config.email,
            cc: '',
            subject: data.subject
          }, function (err, message) {
            if(err !== null){
               console.log(err || message);
            result = (JSON.stringify(err.message));
            }else{
                console.log(message) 
                result = (JSON.stringify("Success"));
            }
          });
   } catch (error) {
        result = 'Something went wrong!';
    }
    res.render('contact', {layout: 'index',services,settings, result})
})



app.listen(config.port, () => console.log(`App is listening on url http://localhost:${config.port}`));   

const homeSlider = [
    {
        id: 2,
        title: 'Best Supply of <br>School Materials and Uniforms',
        description: 'When we declare our satisfaction hinges upon your delight, we genuinely intend to savor it, as is befitting royalty.',
        image: '/assets/img/banner/pexels-pixabay-207665.jpg',

    },

    {
        id: 3,
        title: 'Bite into Bliss: <br>Discover Our Irresistable Bakery Delights',
        description: 'When we declare our satisfaction hinges upon your delight, we genuinely intend to savor it, as is befitting royalty.',
        image: '/assets/img/banner/pexels-klaus-nielsen-6287283.jpg',

    },

    {
        id: 7,
        title: 'Navigate Prosperity: <br>Expert Finacial Management Consulting',
        description: 'When we declare our satisfaction hinges upon your delight, we genuinely intend to savor it, as is befitting royalty.',
        image: '/assets/img/banner/financial-consultant.jpg',

    },


    {
        id: 1,
        title: 'First & Quality <br>Printing Press',
        description: 'When we declare our satisfaction hinges upon your delight, we genuinely intend to savor it, as is befitting royalty.',
        image: '/assets/img/banner/banner-1.png',

    },


    {
        id: 4,
        title: 'From Our Kitchen to Event: Unforgettable Catering',
        description: 'When we declare our satisfaction hinges upon your delight, we genuinely intend to savor it, as is befitting royalty.',
        image: '/assets/img/banner/pexels-naim-benjelloun-2291367.jpg',

    },

    {
        id: 5,
        title: 'Shine Bright: <br>Your Trusted Cleaning Partner.',
        description: 'When we declare our satisfaction hinges upon your delight, we genuinely intend to savor it, as is befitting royalty.',
        image: '/assets/img/banner/pexels-tima-miroshnichenko-6195125.jpg',

    },

    {
        id: 6,
        title: 'Breath in Serenity:<br>Our Garden, Your Oasis',
        description: 'When we declare our satisfaction hinges upon your delight, we genuinely intend to savor it, as is befitting royalty.',
        image: '/assets/img/banner/gardening-barner.jpg',

    },

    
]

const services = [
    {
        id: 1,
        name: 'Supply of School Materials and Uniforms',
        description: "ASFAT is your one-stop shop for school materials and uniforms, catering to both educational institutions and corporate clients. We supply a wide range of quality materials, uniforms, and accessories, ensuring students, staff, and employees are well-prepared and professionally attired for their respective roles and activities.",
        image: '/assets/img/banner/pexels-pixabay-207665.jpg',
        iconImage:'/assets/img/icons/uniform.png',
        icon: 'flaticon-students',
        experiences:'From finance, retail, and travel, to social media, cybersecurity, ad tech, & more, market leaders are leveraging web data to maintain their advantage. Discover how it can work for you.',
        gallery: [
            {
                id: 1,
                title: 'Pen & Pencils',
                image: '/assets/img/case/stationery-school-materials/graphite-669371_1920.jpg',
            },

            {
                id: 1,
                title: 'Stepler and Staple Pins',
                image: '/assets/img/case/stationery-school-materials/office-accessories-1803666_1920.jpg',
            },

            {
                id: 1,
                title: 'School Accessories',
                image: '/assets/img/case/stationery-school-materials/pexels-oleksandr-p-12932614.jpg',
            },

            {
                id: 1,
                title: 'School Bags',
                image: '/assets/img/case/stationery-school-materials/school-supplies-5541099_1920.jpg',
            },

            {
                id: 1,
                title: 'School Accessories',
                image: '/assets/img/case/stationery-school-materials/pexels-oleksandr-p-12932614.jpg',
            },
        ]
    },

    {
        id: 2,
        name: 'Bakery',
        description: "Our artisanal bakery offers a delectable range of freshly baked goods, from  Swahili coockies (visheti),bread and pastries to cakes and confections. Our commitment to quality ingredients and traditional techniques ensures a delightful culinary experience for all.",
        image: '/assets/img/banner/pexels-klaus-nielsen-6287283.jpg',
        iconImage:'/assets/img/icons/bake.png',
        icon: 'flaticon-printer',
        experiences:'From finance, retail, and travel, to social media, cybersecurity, ad tech, & more, market leaders are leveraging web data to maintain their advantage. Discover how it can work for you.',
        gallery: [
            {
                id: 1,
                title: 'Visheti Baking',
                image: '/assets/img/case/WhatsApp Image 2023-10-09 at 09.19.11_6a838378.jpg',
            },

            {
                id: 2,
                title: 'Visheti',
                image: '/assets/img/case/WhatsApp Image 2023-10-09 at 09.19.12_805fc7ea.jpg',
            },

            {
                id:31,
                title: 'Visheti',
                image: '/assets/img/case/WhatsApp Image 2023-10-09 at 09.19.12_5243b4c5.jpg',
            },

            {
                id: 4,
                title: 'Bussiness Card',
                image: '/assets/img/case/WhatsApp Image 2023-10-09 at 09.19.15_3ebde8e0.jpg',
            },

            {
                id: 5,
                title: 'Printing',
                image: '/assets/img/case/WhatsApp Image 2023-10-09 at 09.19.15_35518b75.jpg',
            },
        ]
    },
    {
        id: 3,
        name: 'Consultancy in Financial Management',
        description: "Our financial management consultancy services help businesses make informed decisions, optimize financial processes, and achieve financial stability. Our expert team offers personalized solutions to address your financial challenges.",
        image: '/assets/img/banner/financial-consultant.jpg',
        iconImage:'/assets/img/icons/consultation.png',
        icon: 'flaticon-printer',
        experiences:'From finance, retail, and travel, to social media, cybersecurity, ad tech, & more, market leaders are leveraging web data to maintain their advantage. Discover how it can work for you.',
        gallery: [
            {
                id: 1,
                title: 'T shirt Pinting',
                image: '/assets/img/case/case-1.jpg',
            },

            {
                id: 1,
                title: 'Document Pinting',
                image: '/assets/img/case/case-2.jpg',
            },

            {
                id: 1,
                title: 'Wall Papers Printing',
                image: '/assets/img/case/case-3.jpg',
            },

            {
                id: 1,
                title: 'Bussiness Card',
                image: '/assets/img/case/case-4.jpg',
            },

            {
                id: 1,
                title: 'Printing',
                image: '/assets/img/case/case-5.jpg',
            },
        ]
    },

    {
        id: 4,
        name: 'Printing and Stationery',
        description: ` provide comprehensive printing 
                        and stationery solutions for businesses and 
                        individuals. Our services include design, 
                        printing, and customization of a wide range
                         of products, from business cards to promotional materials.`,
        image: '/assets/img/banner/banner-1.png',
        iconImage:'/assets/img/services/services-01.png',
        icon: 'flaticon-printer',
        experiences:'From finance, retail, and travel, to social media, cybersecurity, ad tech, & more, market leaders are leveraging web data to maintain their advantage. Discover how it can work for you.',
        gallery: [
            {
                id: 1,
                title: 'T shirt Pinting',
                image: '/assets/img/case/case-1.jpg',
            },

            {
                id: 1,
                title: 'Document Pinting',
                image: '/assets/img/case/case-2.jpg',
            },

            {
                id: 1,
                title: 'Wall Papers Printing',
                image: '/assets/img/case/case-3.jpg',
            },

            {
                id: 1,
                title: 'Bussiness Card',
                image: '/assets/img/case/case-4.jpg',
            },

            {
                id: 1,
                title: 'Printing',
                image: '/assets/img/case/case-5.jpg',
            },
        ]
    },

    {
        id: 5,
        name: 'Catering Services',
        description: "From corporate events to weddings and private parties, ASFAT Catering Services offers a diverse menu tailored to your specific needs. Our culinary team creates memorable dining experiences that delight the senses.",
        image: '/assets/img/banner/pexels-naim-benjelloun-2291367.jpg',
        iconImage:'/assets/img/icons/waiter.png',
        icon: 'flaticon-printer',
        experiences:'From finance, retail, and travel, to social media, cybersecurity, ad tech, & more, market leaders are leveraging web data to maintain their advantage. Discover how it can work for you.',
        gallery: [
            {
                id: 1,
                title: 'Saving Food',
                image: '/assets/img/case/catering/andra-c-taylor-jr-soJBvazDKL0-unsplash.jpg',
            },

            {
                id: 2,
                title: 'Cooking Food',
                image: '/assets/img/case/catering/dolores-preciado-kFEdwp6n_mI-unsplash.jpg',
            },

            {
                id: 3,
                title: 'Food Budgeting',
                image: '/assets/img/case/catering/pexels-naim-benjelloun-2291367.jpg',
            },

            {
                id: 4,
                title: 'Delicious Food',
                image: '/assets/img/case/catering/saile-ilyas-SiwrpBnxDww-unsplash.jpg',
            },
        ]
    },

    {
        id: 6,
        name: 'Cleaning Services',
        description: "ASFAT Cleaning Services specializes in commercial and residential cleaning. Our experienced team uses eco-friendly products and efficient techniques to maintain clean, safe, and hygienic environments.",
        image: '/assets/img/banner/pexels-tima-miroshnichenko-6195125.jpg',
        iconImage:'/assets/img/icons/cleaning-cart.png',
        icon: 'flaticon-printer',
        experiences:'From finance, retail, and travel, to social media, cybersecurity, ad tech, & more, market leaders are leveraging web data to maintain their advantage. Discover how it can work for you.',
        gallery: [
            {
                id: 1,
                title: 'Cleanig Service',
                image: '/assets/img/case/cleaning/clay-banks-cEzMOp5FtV4-unsplash.jpg',
            },

            {
                id: 2,
                title: 'House Cleaning',
                image: '/assets/img/case/cleaning/pexels-matilda-wormwood-4098759.jpg',
            },

            {
                id: 3,
                title: 'Cleaning',
                image: '/assets/img/case/cleaning/pexels-matilda-wormwood-4098761.jpg',
            },

            {
                id: 4,
                title: 'Cleaning',
                image: '/assets/img/case/cleaning/pexels-polina-zimmerman-4008518.jpg',
            },
        ]
    },

    {
        id: 7,
        name: 'Gardening and Landscaping',
        description: "ASFAT's gardening and landscaping services transform outdoor spaces into stunning, harmonious environments. Whether it's residential or commercial properties, we create lush gardens and appealing landscapes that enhance the beauty and functionality of any space.",
        image: '/assets/img/banner/gardening-barner.png',
        iconImage:'/assets/img/icons/gardening.png',
        icon: 'flaticon-printer',
        experiences:'From finance, retail, and travel, to social media, cybersecurity, ad tech, & more, market leaders are leveraging web data to maintain their advantage. Discover how it can work for you.',
        gallery: [
            {
                id: 1,
                title: 'Planting',
                image: '/assets/img/case/gardening/pexels-cottonbro-studio-4503265.jpg',
            },

            {
                id: 1,
                title: 'Managing Garden',
                image: '/assets/img/case/gardening/pexels-dominika-roseclay-2433500.jpg',
            },

            {
                id: 1,
                title: 'Decorating Garden',
                image: '/assets/img/case/gardening/pexels-markus-spiske-2013782.jpg',
            },

            {
                id: 1,
                title: 'Watering Garden',
                image: '/assets/img/case/gardening/pexels-kaboompics-com-6442.jpg',
            },

            {
                id: 1,
                title: 'Watering Garden',
                image: '/assets/img/case/gardening/pexels-karolina-grabowska-4750274.jpg',
            },
        ]
    },
]

const settings = {
    phone: '0754 98 50 98',
    telephone: '0714 36 11 81',
    email: 'info@asfat.co.tz',
    logoWhite: '/assets/img/logo/logo-white-2.png',
    logoBlack: '/assets/img/logo/logo-black.png',
    logo: '/assets/img/logo/logo.png',
    address: 'Plot no 826 Block E Tegeta',
    addressLink: 'https://www.google.com/maps/search/Humble+Tower,+NYC/@40.735596,-74.0092433,14z',
    facebook:'facebook.com',
    instergram: 'instergram.com',
    linkedin: 'linkedin.com',
    twitter: 'twitter.com', 
    mission: 'Deliver outstanding products and services through a commitment to quality, creativity, and customer satisfaction, while maintaining a focus on sustainable practices and community engagement.',
    vision: 'To be the leading provider of innovative and reliable services, meeting the diverse needs of our clients and contributing to the growth and success of our community.',
    values:[
        {
            id: 1,
            title:'Customer-Centricity',
            description: 'A commitment to understanding and meeting the needs of customers. It involves providing excellent customer service, listening to feedback, and continuously improving products or services.',
        },
        {
            id: 2,
            title:'Quality',
            description: ' Striving for excellence in all aspects of the business, from product or service quality to operational efficiency. High-quality products and services lead to customer satisfaction and loyalty.',
        },
        {
            id: 3,
            title:'Innovation',
            description: 'Encouraging creativity and a willingness to adapt and innovate. This value fosters a culture of continuous improvement and staying ahead of the competition.',
        },
    ],
    
}

const team = [
        {
            id:1,
            name: 'Myron L. Boykin',
            title: 'Prining Guy',
            image: '/assets/img/team/team-01.jpg',
            facebook:'facebook.com',
            instergram: 'instergram.com',
            linkedin: 'linkedin.com',
            twitter: 'twitter.com'
        },
    
        {
            id:2,
            name: 'M. Brode',
            title: 'Cleaning Manager',
            image: '/assets/img/team/team-02.jpg',
            facebook:'facebook.com',
            instergram: 'instergram.com',
            linkedin: 'linkedin.com',
            twitter: 'twitter.com'
        },
    
        {
            id:3,
            name: 'Frank E. Stuber',
            title: 'CEO',
            image: '/assets/img/team/team-03.jpg',
            facebook:'facebook.com',
            instergram: 'instergram.com',
            linkedin: 'linkedin.com',
            twitter: 'twitter.com'
        },
    
        {
            id:6,
            name: 'Myron L. Boykin',
            title: 'Finacial Adiviser',
            image: '/assets/img/team/team-04.jpg',
            facebook:'facebook.com',
            instergram: 'instergram.com',
            linkedin: 'linkedin.com',
            twitter: 'twitter.com'
        },
]

const experiences = [
    {
        id:1,
        title:'',
        description:'',
    },

    {
        id:1,
        title:'',
        description:'',
    },

    {
        id:1,
        title:'',
        description:'',
    },

    {
        id:1,
        title:'',
        description:'',
    },


]

const testimonials = [
    {
        id: 1,
        name: 'Said Mpinga',
        title: 'System tester',
        profile: '/assets/img/testimonial/author-2.jpg',
        testimonial: 'Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis.',
        rate: 4,
    },

    {
        id: 2,
        name: 'Clara Richardson',
        title: 'Teacher',
        profile: '/assets/img/testimonial/author-3.jpg',
        testimonial: 'Saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur.',
        rate: 3,
    },
    {
        id: 3,
        name: 'Jade Sampson',
        title: 'Account Manager',
        profile: '/assets/img/testimonial/author-4.jpg',
        testimonial: 'In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best.',
        rate: 4,
    },
    {
        id: 4,
        name: 'Mathias Herring',
        title: 'Student',
        profile: '/assets/img/testimonial/author-1.jpg',
        testimonial: 'The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure.',
        rate: 5,
    },

    {
        id: 5,
        name: 'Miranda Helson',
        title: 'Business Owner',
        profile: '/assets/img/testimonial/author-1.jpg',
        testimonial: 'I never leave in-house without business card. They company me to meetings, interviews and all social events.',
        rate: 5,
    },
]

