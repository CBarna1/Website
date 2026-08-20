import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { readFileSync, existsSync, unlinkSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const pwFile = path.join(process.cwd(), ".seed-admin-password.txt");
  const hasExplicitPassword = existsSync(pwFile) || Boolean(process.env.SEED_ADMIN_PASSWORD);
  const adminPassword = existsSync(pwFile)
    ? readFileSync(pwFile, "utf-8").trim()
    : process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  const existingAdmin = await prisma.user.findUnique({ where: { email: "admin@kelson.co.zm" } });
  const passwordHash = hasExplicitPassword ? await bcrypt.hash(adminPassword, 10) : existingAdmin?.passwordHash ?? await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: "admin@kelson.co.zm" },
    update: hasExplicitPassword ? { passwordHash } : {},
    create: {
      email: "admin@kelson.co.zm",
      name: "Site Administrator",
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      tagline: "Empowering Your Digital Transformation",
      blurb:
        "We place you at the centre of international networks to advance your strategic interests.",
      about:
        "At Kelson Innovations, we excel in delivering comprehensive IT solutions designed to empower your business. Our extensive range of top-tier IT hardware, software, and accessories, combined with our round-the-clock managed services and support, ensures that your operations run smoothly and efficiently.",
      phonePrimary: "+260 955 729 111",
      phoneSecondary: "+260 211 261 000",
      address: "15 New Kasama, Off Leopards Hill Rd, Lusaka, Zambia",
      hours: "Mon - Sat: 8am - 5pm, Sunday: Closed",
    },
  });

  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    await prisma.service.createMany({
      data: [
        { icon: "LifeBuoy", title: "Managed Services & Support", description: "Round-the-clock managed services and support from certified experts to keep your systems running smoothly, providing peace of mind and uninterrupted operations.", order: 0 },
        { icon: "FileSignature", title: "Customized Service Level Agreements", description: "Tailored service level agreements (SLAs) are available as-needed, providing you with the flexibility to choose the level of support that best meets your requirements and budget.", order: 1 },
        { icon: "Wrench", title: "Onsite and Remote IT Services", description: "We specialize in providing comprehensive IT services tailored for firms without an in-house IT department, offering both onsite and remote support.", order: 2 },
        { icon: "Code2", title: "Development & Digitization", description: "Full-stack development, custom scripting, and digitization services leveraging Microsoft Power Platform and other tools to modernize your processes.", order: 3 },
        { icon: "CloudUpload", title: "Deployment & Migration", description: "Expert deployment and migration services, including Azure Endpoint management, MDM, ATP, and Intune, ensuring seamless transitions and optimal performance.", order: 4 },
        { icon: "Building2", title: "Infrastructure Services", description: "Comprehensive infrastructure services covering Wi-Fi deployments, managed firewall solutions, and data center deployments with HPE, Dell, and Lenovo.", order: 5 },
        { icon: "HardDrive", title: "Extended Hardware Support", description: "Extended hardware support including out-of-warranty services, local spares depot, and cross-platform enterprise hardware support from HP, Dell, EMC, Cisco, and more.", order: 6 },
        { icon: "Handshake", title: "Third-Party Fault Resolution", description: "We coordinate with third-party vendors for fault resolution or hardware replacement, ensuring prompt and efficient resolution of any issues.", order: 7 },
        { icon: "Hotel", title: "Hotel Management Solutions", description: "Expert setup and ongoing support for Opera PMS, Opera S&C, Oracle Hospitality, Simphony and other systems, optimizing hotel operations and guest experiences.", order: 8 },
      ],
    });
  }

  const whyCount = await prisma.whyChooseUsItem.count();
  if (whyCount === 0) {
    await prisma.whyChooseUsItem.createMany({
      data: [
        { title: "Expertise", description: "With years of experience and a team of skilled professionals, we bring unparalleled expertise to every project, ensuring the highest quality of service.", order: 0 },
        { title: "Customized Solutions", description: "We understand that every business is unique. That's why we offer tailored solutions designed to address specific challenges and objectives.", order: 1 },
        { title: "Reliability", description: "Our commitment to reliability is unwavering. We deliver on our promises, providing dependable services and support that you can trust.", order: 2 },
        { title: "Client-Centric Approach", description: "At the heart of everything we do is our dedication to client satisfaction, delivering personalized solutions and attentive support.", order: 3 },
      ],
    });
  }

  const stepCount = await prisma.processStep.count();
  if (stepCount === 0) {
    await prisma.processStep.createMany({
      data: [
        { step: "01", title: "Discovery", description: "We assess your current IT landscape and identify what your business truly needs.", order: 0 },
        { step: "02", title: "Planning", description: "Our team designs a tailored roadmap and solution architecture around your goals.", order: 1 },
        { step: "03", title: "Execute", description: "We deploy, migrate, and integrate solutions with minimal disruption to your operations.", order: 2 },
        { step: "04", title: "Deliver", description: "Ongoing support and monitoring ensure your systems keep running smoothly, long-term.", order: 3 },
      ],
    });
  }

  const statCount = await prisma.stat.count();
  if (statCount === 0) {
    await prisma.stat.createMany({
      data: [
        { value: 500, suffix: "+", label: "Completed Cases", order: 0 },
        { value: 15000, suffix: "+", label: "Happy Customers", order: 1 },
        { value: 40, suffix: "+", label: "Expert Members", order: 2 },
      ],
    });
  }

  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        { name: "Arnold Burner", role: "Senior Developer", quote: "Kelson Innovations helped the client achieve their goal of calling the attention of mobile network operators. The expert team was also able to develop an app with commendable UI/UX. The client appreciates their flexibility in terms.", order: 0 },
        { name: "Sachin Diwar", role: "CEO / Founder", quote: "Ordered my first mobile app development to Kelson Innovations. I was an inexperienced contractor but they carefully listened to my request and tried to deliver the best quality of service. All phone calls and emails are answered very professionally.", order: 1 },
      ],
    });
  }

  const blogPosts = [
    { title: "Regional Manager & Limited Time Management", slug: "regional-manager-limited-time-management", excerpt: "With over a decade of experience, we've established ourselves as one of the leading IT partners in the region.", image: "/business-colleagues-attend-online-videocall-meeting-with-shareholder.jpg", order: 0 },
    { title: "Revitalising Your People in a Retail Downturn", slug: "revitalising-your-people-in-to-a-retail-downturn", excerpt: "With over a decade of experience, we've established ourselves as one of the leading IT partners in the region.", image: "/diverse-business-employees-group-celebrate-successful-outcome.jpg", order: 1 },
    { title: "Organisational Teams Are Just Like Families", slug: "organisational-teams-of-the-are-just-like-families", excerpt: "With over a decade of experience, we've established ourselves as one of the leading IT partners in the region.", image: "/coworkers-engaging-problem-solving-meeting-corporation.jpg", order: 2 },
    { title: "Virtual Classroom Software Development for Teaching", slug: "virtual-classroom-software-development-for-teaching", excerpt: "With over a decade of experience, we've established ourselves as one of the leading IT partners in the region.", image: "/group-diverse-pupils-engaging-online-course-discussion-via-video-call.jpg", order: 3 },
    { title: "Digital Transformation in Healthcare in 2021: 7 Keys", slug: "digital-transformation-in-healthcare-in-2021-7-keys", excerpt: "With over a decade of experience, we've established ourselves as one of the leading IT partners in the region.", image: "/team-young-nurses-learning-practice-from-doctor-expert-cabinet.jpg", order: 4 },
    { title: "Know the Difference! Food Delivery Apps vs. Food", slug: "know-the-difference-food-delivery-apps-vs-food", excerpt: "With over a decade of experience, we've established ourselves as one of the leading IT partners in the region.", image: "/tech-support-oversees-ai-neural-network.jpg", order: 5 },
  ];
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: { image: post.image },
      create: post,
    });
  }

  const clientCount = await prisma.clientLogo.count();
  if (clientCount === 0) {
    await prisma.clientLogo.createMany({
      data: [
        { name: "Bwino Milling Co. Ltd", src: "/clients/bwino-milling.webp", order: 0 },
        { name: "Mimosa Resources", src: "/clients/mimosa-resources.jpg", order: 1 },
        { name: "Zam Trade Sales Management", src: "/clients/zam-trade.webp", order: 2 },
        { name: "HCAZ - Lusaka Hospitality", src: "/clients/lusaka-hospitality.webp", order: 4 },
        { name: "Kariba", src: "/clients/kariba.png", order: 5 },
      ],
    });
  }

  const additionalClients = [
    { name: "Zambian Cancer Society", src: "/clients/zcs-logo42-01-1-e1661881394942.png", order: 6 },
    { name: "Aquarite Purified Water", src: "/clients/OIP.webp", order: 7 },
    { name: "Southern Sun Ridgeway", src: "/clients/5f49543d8d9c2.png", order: 8 },
    { name: "Zambia Air Force", src: "/clients/206-2065514_zambia-air-force-logo.png", order: 9 },
    { name: "R Client", src: "/clients/R.png", order: 10 },
  ];

  for (const client of additionalClients) {
    const existingClient = await prisma.clientLogo.findFirst({ where: { src: client.src } });
    if (existingClient) {
      await prisma.clientLogo.update({ where: { id: existingClient.id }, data: client });
    } else {
      await prisma.clientLogo.create({ data: client });
    }
  }

  const productCount = await prisma.product.count();
  if (productCount === 0) {
    await prisma.product.createMany({
      data: [
        {
          name: "Business Laptop",
          slug: "business-laptop",
          description: "Reliable business laptop configuration for everyday office work and managed IT environments.",
          price: 18500,
          category: "Computers",
          stock: 5,
          order: 0,
        },
        {
          name: "Wireless Access Point",
          slug: "wireless-access-point",
          description: "Business-grade wireless access point for dependable office connectivity.",
          price: 3200,
          category: "Networking",
          stock: 12,
          order: 1,
        },
        {
          name: "Managed Support Starter Plan",
          slug: "managed-support-starter-plan",
          description: "A practical monthly support starting point for small teams that need reliable IT assistance.",
          price: 2500,
          category: "Services",
          stock: 0,
          order: 2,
        },
      ],
    });
  }

  const brandCount = await prisma.brand.count();
  if (brandCount === 0) {
    await prisma.brand.createMany({
      data: [
        { name: "HP", src: "/brands/hp.png", order: 0 },
        { name: "Dell", src: "/brands/dell.png", order: 1 },
        { name: "Hewlett Packard Enterprise", src: "/brands/hpe.png", order: 2 },
        { name: "Cisco", src: "/brands/cisco.png", order: 3 },
        { name: "Microsoft", src: "/brands/microsoft.png", order: 4 },
        { name: "Oracle", src: "/brands/oracle.png", order: 5 },
        { name: "Fujitsu", src: "/brands/fujitsu.png", order: 6 },
        { name: "Hitachi", src: "/brands/hitachi.jpg", order: 7 },
        { name: "Juniper Networks", src: "/brands/juniper.png", order: 8 },
        { name: "Ubiquiti", src: "/brands/ubiquiti.jpg", order: 9 },
        { name: "Nortel", src: "/brands/nortel.png", order: 10 },
        { name: "Epson", src: "/brands/epson.jpg", order: 11 },
        { name: "Symphony", src: "/brands/symphony.png", order: 12 },
      ],
    });
  }

  console.log("Seed complete.");
  console.log("Admin login -> email: admin@kelson.co.zm  password: " + adminPassword);

  if (existsSync(pwFile)) unlinkSync(pwFile);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
