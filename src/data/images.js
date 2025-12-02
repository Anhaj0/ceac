// src/data/images.js

// --- 1. TEAM IMAGES ---
import hassanThassim from '../assets/Mr. Hassan Thassim.webp';
import raeeshaHassan from '../assets/Mrs. Raeesha Hassan.webp';
import mizraHussain from '../assets/Mrs. Mizra Hussain.webp';
import aayshaImtiyaz from '../assets/Ms. Aaysha Imtiyaz.webp';
import nafiyaAhamed from '../assets/Mrs. Nafiya Shazly Ahamed.webp';
import rawzanaImthissam from '../assets/Mrs. Rawzana Imthissam.webp';
import sheimaRikaz from '../assets/Mrs. Sheima Rikaz.webp';

// --- GUEST IMAGES (NEW) ---
import tariqKhan from '../assets/Mr. Tariq Khan.webp';
import zaharaAnsary from '../assets/Mrs. Zahara Ansary.webp';

// --- 2. GALLERY IMAGES ---
import photo1_2024 from '../assets/photo 1 2024.webp';
import photo2_2024 from '../assets/photo 2 2024.webp';
import photo3_2024 from '../assets/photo 3 2024.webp';
import photo4_2024 from '../assets/photo 4 2024.webp';
import photo5_2024 from '../assets/photo 5 2024.webp';

// --- 3. SLIDESHOW IMAGES ---
import slide1 from '../assets/slide 1.webp';
import slide2 from '../assets/slide 2.webp';
import slide3 from '../assets/slide 3.webp';
import slide1Mobile from '../assets/slide 1 mobile.webp'; 
import slide2Mobile from '../assets/slide 2 mobile.webp';
import slide3Mobile from '../assets/slide 3 mobile.webp';

// --- 4. NEWS IMAGES ---
import newIntakeNews from '../assets/graphic_new_intake.webp'; 
import awarding2025News from '../assets/2025 Awarding.webp';


// --- CONFIGURATION ---

export const teamData = [
  {
    name: 'Mr. Hassan Thassim',
    title: 'Chairman of Cambridge English Academy Colombo.',
    img: hassanThassim,
    style: { objectPosition: '50% 10%' } 
  },
  {
    name: 'Mrs. Raeesha Hassan',
    title: 'Founder/Directress of Cambridge English Academy Colombo.',
    img: raeeshaHassan,
    style: { objectPosition: '50% 20%' } 
  },
  {
    name: 'Mrs. Mizra Hussain',
    title: 'HR Manager',
    img: mizraHussain,
    style: { objectPosition: '50% 10%' }
  },
  {
    name: 'Ms. Aaysha Imtiyaz',
    title: 'Coordinator',
    img: aayshaImtiyaz,
    style: { objectPosition: '50% 20%' }
  },
  {
    name: 'Mrs. Nafiya Shazly Ahamed',
    title: 'Senior Course Coordinator',
    img: nafiyaAhamed,
    style: { objectPosition: '50% 10%' }
  },
  {
    name: 'Mrs. Rawzana Imthissam',
    title: 'Junior Course Coordinator',
    img: rawzanaImthissam,
    style: { objectPosition: '50% 0%' }
  },
  {
    name: 'Mrs. Sheima Rikaz',
    title: 'Event Coordinator',
    img: sheimaRikaz,
    style: { objectPosition: '50% 20%' }
  }
];

// --- NEW GUEST MESSAGES DATA ---
export const guestMessages = [
  {
    name: "Mr. Tariq Khan",
    title: "Head, Cambridge English at International Examination Services",
    img: tariqKhan,
    text: "With over 30 years of experience in the educational sector, I have had the honor of witnessing the growth of CEAC. Ms. Raeesha plays a pivotal role in enhancing the English language skills of numerous students. Cambridge English Academy has quickly established itself as one of the top ten Preparation Centres of IES, consistently producing a considerable number of successful students. I am confident that under her guidance, the academy will continue to expand and achieve more milestones."
  },
  {
    name: "Mrs. Zahara Ansary",
    title: "Country Head - Cambridge University Press & Assessment - Sri Lanka & The Maldives",
    img: zaharaAnsary,
    // PLACEHOLDER TEXT - Please replace with the actual text from the video/image
    text: "We are honored to recognize Cambridge English Academy Colombo for their outstanding contribution to English language education. Their commitment to maintaining high standards and empowering students with global qualifications is truly commendable. We look forward to continuing our strong partnership to build a brighter future for learners in Sri Lanka." 
  }
];

export const galleryData = [
    { src: photo1_2024, alt: 'Academy Event 2024 - 1', year: '2024' },
    { src: photo2_2024, alt: 'Academy Event 2024 - 2', year: '2024' },
    { src: photo3_2024, alt: 'Academy Event 2024 - 3', year: '2024' },
    { src: photo4_2024, alt: 'Academy Event 2024 - 4', year: '2024' },
    { src: photo5_2024, alt: 'Academy Event 2024 - 5', year: '2024' },
];

export const slideshowData = [
    {
      bgImageDesktop: slide1,
      bgImageMobile: slide1Mobile || slide1, 
      cta: { text: 'Explore Our Courses', href: '/courses', variant: 'gold' }
    },
    {
      bgImageDesktop: slide2,
      bgImageMobile: slide2Mobile || slide2,
      cta: { text: 'Contact Us Today', href: '/contact', variant: 'blue' }
    },
    {
      bgImageDesktop: slide3,
      bgImageMobile: slide3Mobile || slide3,
      cta: { text: 'Learn More About Us', href: '/about', variant: 'gold' }
    }
];

export const newsImages = {
    newIntake: newIntakeNews,
    awarding2025: awarding2025News,
};