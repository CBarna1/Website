// Detail pages for each service and solution, carried over from the previous kelson.co.zm site.
// Rendered by app/(site)/services/[slug]/page.tsx and listed on /services.

export type DetailItem = { title?: string; text: string };
export type DetailBlock = { heading: string; paragraphs?: string[]; items?: DetailItem[] };
export type ServiceDetail = {
  slug: string;
  group: "service" | "solution";
  icon: string; // a lucide-react icon name, see ICONS in the detail page
  title: string;
  summary: string; // shown on the card on /services
  tagline?: string;
  intro: string[];
  blocks: DetailBlock[];
  closing?: string;
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "hosted-services",
    group: "service",
    icon: "Cloud",
    title: "Hosted Services",
    summary:
      "We offer comprehensive and diverse solutions from Microsoft (Office 365 Suite), from Outlook to Teams. Priced aggressively and charged monthly, this will fit comfortably in any budget. We also offer domain and server hosting coupled with expert support and 99.9% uptime.",
    tagline: "Transform your business with reliable hosted services: flexible, scalable, and secure solutions tailored for your needs.",
    intro: [
      "We are excited to introduce our comprehensive range of Hosted Services that cater to your business needs. With a focus on reliability, security, and performance, our hosted solutions are designed to enhance your operational efficiency and drive growth.",
    ],
    blocks: [
      {
        heading: "What we offer",
        items: [
          { title: "Cloud Hosting", text: "Experience scalable resources with our cloud hosting solutions, allowing you to easily adjust your infrastructure as your business grows." },
          { title: "Website Hosting", text: "Ensure your website runs smoothly with our fast and secure hosting options, complete with expert support and a 99.9% uptime guarantee." },
          { title: "Managed Services", text: "Let us take care of your IT needs with our managed services, where our team handles everything from server management to security monitoring." },
          { title: "Backup and Recovery", text: "Protect your valuable data with our robust backup and recovery solutions, designed to keep your information safe and accessible." },
        ],
      },
      {
        heading: "Why choose our hosted services?",
        items: [
          { title: "24/7 Support", text: "Our dedicated support team is available around the clock to assist you with any issues or questions." },
          { title: "Scalability", text: "Easily adapt to changing business demands with our flexible hosting plans tailored to your needs." },
          { title: "Enhanced Security", text: "We prioritize the security of your data with industry-standard encryption and proactive monitoring." },
        ],
      },
    ],
    closing: "Thank you for choosing us as your trusted hosting partner!",
  },
  {
    slug: "networking",
    group: "service",
    icon: "Network",
    title: "Networking",
    summary:
      "Network infrastructure forms the basis of all modern information, communication, audio, video and security solutions. We provide a full range of services, including structured cabling, wireless solutions, voice infrastructure and server rooms.",
    tagline: "Welcome to our ICT networking solutions.",
    intro: [
      "In today's fast-paced digital world, reliable and efficient networking is crucial for the success of any business. At Kelson Innovations, we specialize in providing cutting-edge ICT networking solutions designed to meet the unique needs of our clients. Our expertise spans a wide array of services tailored to enhance connectivity and improve operational efficiency.",
    ],
    blocks: [
      {
        heading: "Our services",
        items: [
          { title: "Network Design and Implementation", text: "We offer comprehensive network design and implementation services that ensure your network infrastructure is robust, scalable, and secure. Our team of experts will work closely with you to assess your requirements and create a customized networking solution that aligns with your business goals." },
          { title: "Wireless Networking Solutions", text: "Stay connected with our state-of-the-art wireless networking solutions. We design and deploy secure and high-performance wireless networks that provide seamless connectivity for your employees and customers, no matter where they are." },
          { title: "Network Security Services", text: "Safeguarding your data is our priority. We implement advanced security measures, including firewalls, intrusion detection systems, and encryption protocols, to protect your network from unauthorized access and cyber threats." },
          { title: "Cloud Networking", text: "Embrace the power of the cloud with our cloud networking services. We help you leverage cloud technologies to enhance collaboration, reduce costs, and increase the scalability of your network." },
          { title: "Network Monitoring and Support", text: "Our dedicated support team provides ongoing network monitoring and maintenance to ensure your systems run smoothly. With real-time insights and proactive support, we minimize downtime and enhance performance." },
          { title: "Consulting and Advisory Services", text: "Navigating the complexities of ICT networking can be challenging. Our experienced consultants offer expert advice and strategic planning to help you make informed decisions and optimize your network performance." },
        ],
      },
      {
        heading: "Why choose us?",
        items: [
          { title: "Expert Team", text: "Our skilled professionals have extensive experience in ICT networking and are committed to delivering the best solutions for your business." },
          { title: "Customized Solutions", text: "We understand that every business is different. We tailor our services to meet your specific requirements and challenges." },
          { title: "Cutting-Edge Technology", text: "We utilize the latest technologies and industry best practices to provide reliable, efficient, and secure networking solutions." },
          { title: "Customer-Centric Approach", text: "Our clients are our top priority. We are dedicated to understanding your needs and providing exceptional support at every step." },
        ],
      },
    ],
    closing:
      "Ready to enhance your network infrastructure? Contact us today to discuss how our ICT networking solutions can benefit your business. We look forward to partnering with you on your networking journey!",
  },
  {
    slug: "server-rooms-and-data-centers",
    group: "service",
    icon: "Server",
    title: "Server Rooms and Data Centers",
    summary:
      "Kelson provides a structured data cabling service from single server rooms to multi-location data centers. We are able to assist with the design of server cabinet layout, rack build designs, power and cold aisle containment to suit all current and future requirements.",
    intro: [
      "Discover our expertise in setting up Server Rooms and Data Centers. As technology continues to evolve, the demand for efficient and reliable data management solutions has never been greater. Our team is dedicated to providing top-notch services to ensure your organization's infrastructure is robust and future-ready.",
    ],
    blocks: [
      {
        heading: "What we offer",
        items: [
          { title: "Comprehensive Design and Consultation", text: "Tailored designs that meet your specific operational needs, with expert consultation to optimize space, power, and cooling." },
          { title: "Construction and Installation", text: "End-to-end services from construction to installation of server racks, cooling systems, and other essential components, using the latest technologies and industry best practices." },
          { title: "Security and Compliance", text: "Implementation of high-security standards to protect your valuable data, and assistance with compliance for industry regulations (such as ISO and HIPAA)." },
          { title: "Maintenance and Support", text: "Ongoing maintenance and support services to ensure optimal performance, with regular assessments and upgrades to adapt to your growing needs." },
          { title: "Scalability and Future Planning", text: "Strategic planning for future expansions to accommodate business growth, with solutions that evolve with emerging technologies and trends." },
        ],
      },
    ],
    closing:
      "If you have any questions or would like to discuss your specific requirements, please do not hesitate to contact us. Our team is here to assist you.",
  },
  {
    slug: "cctv",
    group: "service",
    icon: "Cctv",
    title: "CCTV and Access Control",
    summary:
      "CCTV (Closed-Circuit Television) and access control are critical components of security systems used in residential, commercial, and industrial environments. Whether it is a small standalone setup or a large networked system across many sites, we have the CCTV and access control solutions to best suit our customers.",
    tagline: "Kelson Innovations: your trusted CCTV solutions provider.",
    intro: [
      "In today's world, security is of utmost importance. Whether for residential or commercial purposes, Closed-Circuit Television (CCTV) systems provide peace of mind by allowing you to monitor and protect your property around the clock. Our state-of-the-art CCTV solutions offer unparalleled security and convenience.",
    ],
    blocks: [
      {
        heading: "Our CCTV solutions",
        items: [
          { title: "Home Surveillance Systems", text: "Keep an eye on your home, day or night, with smart features like motion detection, night vision, and remote viewing. Protect your loved ones and belongings with our reliable home surveillance packages." },
          { title: "Commercial CCTV Systems", text: "Comprehensive security solutions for businesses of all sizes: high-definition, tamper-proof cameras designed for various environments, in surveillance systems tailored to your specific business needs." },
          { title: "Outdoor Security Cameras", text: "Weather-resistant and durable cameras designed for outdoor use, with wide-angle lenses and night vision to capture clear footage in low light. Monitor perimeters, driveways, and entrances." },
          { title: "Dome and PTZ Cameras", text: "Dome cameras provide discreet monitoring with a 360-degree view. PTZ (Pan-Tilt-Zoom) cameras let you control the camera's orientation and zoom in on critical areas, ideal for larger areas that need flexible surveillance." },
        ],
      },
      {
        heading: "Key features",
        items: [
          { title: "24/7 Monitoring", text: "Round-the-clock surveillance to ensure your property is always protected." },
          { title: "Remote Access", text: "View live footage from your smartphone, tablet, or computer, no matter where you are." },
          { title: "High Definition Video", text: "Capture clear and sharp footage with our HD cameras." },
          { title: "Motion Alerts", text: "Get notified of any unusual activity around your property directly on your device." },
          { title: "Cloud Storage Options", text: "Store your footage securely in the cloud, making it easily accessible whenever you need it." },
        ],
      },
      {
        heading: "Installation and support",
        paragraphs: [
          "At Kelson, we provide professional installation services to ensure your CCTV system is set up correctly and efficiently. Our team of experts will guide you through the installation process, helping you choose the right locations for camera placement. We also offer ongoing support and maintenance services to ensure your system remains in peak condition.",
        ],
      },
    ],
  },
  {
    slug: "digital-signage-projection-and-video-walls",
    group: "service",
    icon: "MonitorPlay",
    title: "Digital Signage, Projection, and Video Walls",
    summary:
      "Digital signage, projection, and video walls are integral components of modern visual communication, frequently used in industries such as retail, entertainment, corporate environments, and public spaces.",
    tagline: "Elevate your visual experience with our digital solutions.",
    intro: [
      "At Kelson Innovations, we understand the power of impactful visuals in capturing attention and conveying messages effectively. That's why we offer cutting-edge solutions in Digital Signage, Projection, and Video Walls tailored to meet the needs of various industries and applications.",
    ],
    blocks: [
      {
        heading: "Our solutions",
        items: [
          { title: "Digital Signage", text: "Our digital signage solutions are designed to help you engage your audience in dynamic ways. Whether you're looking to display timely information, enhance brand awareness, or promote special offers, our customizable digital signage options allow you to easily manage and update content in real time. With vibrant displays and user-friendly interfaces, you can transform any space into an interactive experience." },
          { title: "Projection Solutions", text: "Immerse your audience with our high-quality projection systems that suit a variety of settings, from corporate presentations to large-scale events. Our projection solutions deliver stunning visuals and crisp audio, ensuring that your message resonates with every viewer. Choose from a range of projectors and screens to create the perfect setup for your specific needs." },
          { title: "Video Walls", text: "Make a bold statement with our impressive video wall solutions. Featuring seamless displays and high-definition content, our video walls are perfect for control rooms, retail environments, or entertainment venues. Create an eye-catching focal point that not only attracts attention but also enhances the viewer's experience through engaging content." },
        ],
      },
      {
        heading: "Why choose us?",
        items: [
          { title: "Expert Consultation", text: "Our team of experts will work closely with you to understand your requirements and design a customized solution that fits your goals." },
          { title: "Quality Products", text: "We source only the best technology from leading brands to ensure reliability and exceptional performance." },
          { title: "Ongoing Support", text: "We don't just set up your system; we offer comprehensive training and technical support to keep your solutions running smoothly." },
        ],
      },
    ],
    closing:
      "Ready to transform your visual communication? Contact us today to learn more about our digital signage, projection, and video wall solutions. Let's create a visually stunning experience together!",
  },
  {
    slug: "audio-visual-systems-collaboration-and-conferencing",
    group: "service",
    icon: "Video",
    title: "Audio-Visual Systems, Collaboration and Conferencing",
    summary:
      "Intelligent, intuitive and crystal clear audio and video solutions for definitive conferencing, presentation, entertainment and mass communication.",
    tagline: "Elevate your communication with our audio-visual systems.",
    intro: [
      "At Kelson Innovations, we understand that effective communication is the backbone of successful collaboration. That's why we offer cutting-edge Audio-Visual (AV) Systems designed to enhance your virtual and in-person meetings. Our solutions cater to various needs, from small huddle rooms to expansive conference halls.",
    ],
    blocks: [
      {
        heading: "Audio-visual systems",
        items: [
          { text: "High-definition displays and projectors that deliver crisp, vibrant visuals." },
          { text: "Premium sound systems that ensure every participant hears every word clearly." },
          { text: "Customizable AV setups tailored to your specific environment." },
        ],
      },
      {
        heading: "Collaboration solutions",
        items: [
          { text: "Interactive whiteboards and screen sharing tools to foster creativity and engagement." },
          { text: "User-friendly interfaces that make it easy for teams to connect and collaborate, whether in the office or remote." },
          { text: "Secure file sharing and real-time editing features to streamline workflows." },
        ],
      },
      {
        heading: "Conferencing technologies",
        items: [
          { text: "Comprehensive video conferencing solutions that facilitate seamless communication between teams, clients, and stakeholders." },
          { text: "Integration with popular platforms like Zoom, Microsoft Teams, and Google Meet for a unified experience." },
          { text: "Easy-to-use hardware and software that require minimal training to operate." },
        ],
      },
      {
        heading: "Why choose us?",
        items: [
          { title: "Expert Consultation", text: "Our experienced team works closely with you to assess your needs and provide tailored AV solutions." },
          { title: "End-to-End Service", text: "From initial consultation and design to installation and ongoing support, we are with you every step of the way." },
          { title: "Innovative Technology", text: "We stay ahead of the curve, offering the latest in AV technology to ensure your systems are always state-of-the-art." },
        ],
      },
    ],
    closing:
      "Ready to elevate your communication and collaboration? Contact us to discuss your audio-visual system and conferencing needs. Let us help you create an environment that fosters productivity and innovation!",
  },
  {
    slug: "structured-cabling-and-fibre-optics",
    group: "service",
    icon: "Cable",
    title: "Structured Cabling and Fibre Optics",
    summary:
      "Structured cabling and fibre optics are essential components of modern communication systems, especially in enterprise networks, data centers, and telecommunication infrastructures.",
    intro: [
      "Structured Cabling and Fibre Optics are essential components of modern communication systems, especially in enterprise networks, data centers, and telecommunication infrastructures. Below is an overview of both, their components, benefits, and applications.",
    ],
    blocks: [
      {
        heading: "Structured cabling",
        paragraphs: [
          "Structured cabling is a standardized approach to network cabling that consists of various elements organized in a systematic way. It serves as a backbone for telecommunications systems, enabling efficient data transmission and connectivity between different equipment.",
        ],
        items: [
          { title: "Entrance Facilities", text: "Points where outside cabling enters the building." },
          { title: "Equipment Rooms", text: "Housing networking hardware such as servers, routers, and switches." },
          { title: "Vertical Cabling", text: "Interconnects different floors of a building, typically through risers." },
          { title: "Horizontal Cabling", text: "Connects workstations to telecommunications rooms, typically across the same floor." },
          { title: "Telecommunication Rooms", text: "Central points for networking equipment and wiring." },
          { title: "Work Area Components", text: "Includes outlets and patch panels where user devices connect." },
        ],
      },
      {
        heading: "Standards",
        paragraphs: ["Structured cabling systems follow standards set by organizations such as:"],
        items: [
          { title: "ANSI/TIA-568", text: "Telecommunications standards for commercial buildings." },
          { title: "ISO/IEC 11801", text: "International standard for generic cabling for customer premises." },
        ],
      },
      {
        heading: "Benefits of structured cabling",
        items: [
          { title: "Scalability", text: "Easy to upgrade and expand as network demands grow." },
          { title: "Flexibility", text: "Supports a wide range of applications such as voice, data, and video transmission." },
          { title: "Reduced Downtime", text: "Easier troubleshooting and maintenance, minimizing disruptions." },
          { title: "Cost-Effectiveness", text: "Lower lifecycle costs due to standardized design and simplified management." },
        ],
      },
      {
        heading: "Fibre optics",
        paragraphs: [
          "Fibre optics technology uses thin strands of glass or plastic to transmit data as light signals over long distances. It is known for high bandwidth and fast data transmission rates.",
        ],
        items: [
          { title: "Fibre Types", text: "Single-mode Fibre (SMF) lets light travel in a single pathway, suitable for long distances. Multi-mode Fibre (MMF) supports multiple modes of light, used for shorter distances." },
          { title: "Connectors", text: "Optical connectors such as SC, LC, ST, and MTP for connecting fibre optic cables." },
          { title: "Splice Trays", text: "Used to hold and protect optical fibre splices." },
          { title: "Patch Panels", text: "Organize connections in a manageable system." },
          { title: "Transceivers", text: "Devices that convert electrical signals to optical signals and vice versa." },
        ],
      },
      {
        heading: "Benefits of fibre optics",
        items: [
          { title: "High Bandwidth", text: "Capable of transmitting large amounts of data at very high speeds." },
          { title: "Distance", text: "Maintains signal quality over much greater distances than traditional copper cables." },
          { title: "Immunity to Interference", text: "Not affected by electromagnetic interference, providing a more reliable connection." },
          { title: "Reduced Size and Weight", text: "Fibre cables are thinner and lighter than copper wires, enabling more streamlined installations." },
        ],
      },
      {
        heading: "Applications",
        items: [
          { title: "Data Centers", text: "Both structured cabling and fibre optics are vital for connecting servers and storage systems." },
          { title: "Enterprise Networks", text: "Used within corporate offices for voice and data communications." },
          { title: "Telecommunications", text: "Fibre optics are crucial for backbone networks, connecting cities and regions." },
          { title: "Residential Services", text: "High-speed internet and television services increasingly rely on fibre optic technology." },
        ],
      },
    ],
    closing:
      "Both structured cabling and fibre optics play pivotal roles in developing robust, scalable, and high-performance communication networks. Businesses and organizations continue to invest in these technologies to meet increasing data demands and enhance overall efficiency.",
  },
  {
    slug: "it-hardware-accessories",
    group: "solution",
    icon: "Laptop",
    title: "IT Hardware & Accessories",
    summary:
      "A wide range of high-quality IT hardware and accessories for every professional and business, from powerful computers to essential peripherals.",
    tagline: "Your one-stop destination for IT hardware and accessories!",
    intro: [
      "Discover a wide range of high-quality IT hardware and accessories tailored for every tech enthusiast, professional, and business. From powerful CPUs to essential peripherals, we have everything you need to optimize your set-up and enhance your productivity.",
    ],
    blocks: [
      {
        heading: "Shop categories",
        items: [
          { title: "Computers & Laptops", text: "Desktops, laptops, and all-in-ones." },
          { title: "Components", text: "Motherboards, processors, RAM, and storage devices (HDDs, SSDs)." },
          { title: "Peripherals", text: "Keyboards, mice, monitors, and printers." },
          { title: "Networking", text: "Routers, switches, and network cables." },
          { title: "Accessories", text: "Cables and adapters, cases and stands, cooling and power supplies." },
        ],
      },
      {
        heading: "Why buy from Kelson?",
        paragraphs: [
          "At Kelson Innovations, we're passionate about technology and dedicated to providing you with the best IT hardware and accessories available. With years of experience in the industry, our team ensures you receive the most innovative products that meet your needs.",
        ],
      },
      {
        heading: "Need help?",
        paragraphs: [
          "Our dedicated customer support team is here to assist you with any inquiries. Whether you need advice on a product or assistance with an order, call us, email info@kelson.co.zm, or chat with us on WhatsApp.",
        ],
      },
    ],
  },
  {
    slug: "collaboration-telephony",
    group: "solution",
    icon: "PhoneCall",
    title: "Collaboration & Telephony",
    summary:
      "Unified communications, cloud telephony and team collaboration platforms that drive productivity and transform the way your organization communicates.",
    tagline: "Your all-in-one collaboration and telephony solution.",
    intro: [
      "In today's fast-paced digital landscape, seamless communication and collaboration are essential for business success. At Kelson Innovations, we specialize in providing innovative telephony and collaboration solutions that drive productivity, enhance teamwork, and transform the way your organization communicates.",
    ],
    blocks: [
      {
        heading: "Unified communications",
        paragraphs: [
          "Experience a seamless integration of voice, video, messaging, and conferencing to streamline communication. With our unified communications solutions, you can connect with your team and clients effortlessly from anywhere.",
        ],
        items: [
          { text: "HD voice and video calls" },
          { text: "Instant messaging and presence" },
          { text: "Virtual meeting rooms" },
          { text: "File sharing and collaborative tools" },
        ],
      },
      {
        heading: "Cloud telephony",
        paragraphs: [
          "Transition to the future of telephony with our cloud-based phone system. Enjoy the flexibility of managing your calls from any device, anywhere, and reduce your operational costs with our scalable solutions.",
        ],
        items: [{ text: "VoIP technology" }, { text: "Call forwarding and routing" }, { text: "Advanced call analytics" }],
      },
      {
        heading: "Team collaboration platforms",
        paragraphs: [
          "Boost team productivity with our powerful collaboration tools. Share files, manage projects, and communicate in real time with integrated platforms designed for teams of all sizes.",
        ],
        items: [
          { text: "Task management" },
          { text: "Shared workspaces" },
          { text: "Real-time editing and collaboration" },
          { text: "Mobile and desktop accessibility" },
        ],
      },
      {
        heading: "Why choose us?",
        items: [
          { title: "Expert Support", text: "Our dedicated support team is available 24/7 to assist you with any queries or technical issues." },
          { title: "Scalability", text: "Whether you're a startup or a large enterprise, our solutions grow with your business needs." },
          { title: "Security", text: "We prioritize the security of your data with robust encryption and compliance with industry standards." },
          { title: "Cost-Effective Solutions", text: "Reduce your communication costs while increasing efficiency and productivity through our comprehensive packages." },
        ],
      },
    ],
    closing:
      "Ready to transform your communication and collaboration experience? Contact us today for a free consultation and discover how Kelson Innovations can help your business thrive. Kelson Innovations: where innovation meets communication.",
  },
  {
    slug: "ict-solutions",
    group: "solution",
    icon: "Cpu",
    title: "ICT Solutions",
    summary:
      "Infrastructure management, software development, cybersecurity and IT consulting that transform businesses with technology tailored to their needs.",
    tagline: "Innovative ICT solutions for a digital future: transforming businesses with cutting-edge technology tailored to your needs.",
    intro: [
      "Kelson Innovations is a leading provider of ICT solutions, dedicated to empowering businesses with technology that enhances productivity and fosters growth. Our team of experts brings years of experience across various sectors, ensuring customized solutions that meet your unique organizational needs.",
    ],
    blocks: [
      {
        heading: "IT infrastructure management",
        items: [
          { title: "Network Design & Implementation", text: "Ensure robust and secure networks tailored to your business needs." },
          { title: "Cloud Solutions", text: "Migrate to cloud services for enhanced flexibility and scalability." },
        ],
      },
      {
        heading: "Software development",
        items: [
          { title: "Custom Software Solutions", text: "Tailor-made software applications that meet specific business challenges." },
          { title: "Mobile App Development", text: "User-friendly mobile applications for iOS and Android." },
          { title: "Web Development", text: "Dynamic websites that enhance user experience and engagement." },
        ],
      },
      {
        heading: "Cybersecurity solutions",
        items: [
          { title: "Network Security", text: "Protect your network from cyber threats and unauthorized access." },
          { title: "Data Protection", text: "Ensure the security and integrity of your vital data." },
          { title: "Vulnerability Assessments", text: "Identify and remediate potential security risks in your systems." },
        ],
      },
      {
        heading: "IT consulting",
        items: [
          { title: "Technology Assessment", text: "Evaluate your current systems and identify areas for improvement." },
          { title: "Digital Transformation Strategy", text: "A roadmap for your organization's digital transformation journey." },
          { title: "Project Management", text: "Expert management to ensure your ICT projects are delivered on time and within budget." },
        ],
      },
      {
        heading: "Industries we serve",
        paragraphs: ["Our tailored solutions help various industries overcome unique challenges and harness technology's potential."],
        items: [{ text: "NGOs" }, { text: "Mining" }, { text: "Hospitality" }, { text: "Retail" }, { text: "Manufacturing" }],
      },
    ],
    closing: "Ready to transform your business with our ICT solutions? Contact us today for a consultation!",
  },
];

export function getServiceDetail(slug: string) {
  return serviceDetails.find((d) => d.slug === slug);
}
