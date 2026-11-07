"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isForm?: boolean;
}

interface InStockItem {
  name: string;
  category: string;
  quantity: number;
}

// Current inventory
const INVENTORY: InStockItem[] = [
  { name: "Hikvision Dome Camera 4MP", category: "CCTV", quantity: 15 },
  { name: "Hikvision Turret Camera 2MP", category: "CCTV", quantity: 8 },
  { name: "Cisco PoE Switch 48-Port", category: "Network Hardware", quantity: 3 },
  { name: "Dell UPS 3KVA", category: "Power Solutions", quantity: 5 },
  { name: "Cisco IP Phone 8861", category: "Telephony", quantity: 12 },
  { name: "HP Enterprise Server", category: "IT Hardware", quantity: 2 },
  { name: "Fortinet Firewall FortiGate 30E", category: "Security", quantity: 4 },
  { name: "Ubiquiti WiFi 6 Access Point", category: "Networking", quantity: 7 },
];

const BOT_RESPONSES: Record<string, string> = {
  hello: "Hi there! 👋 Welcome to Kelson Innovations. I can help you with:\n• Product availability\n• Service info\n• Getting a quote\n\nWhat interests you?",
  hi: "Hi there! 👋 Welcome to Kelson Innovations. I can help you with:\n• Product availability\n• Service info\n• Getting a quote\n\nWhat interests you?",
  services: "We offer:\n✓ CCTV Security Solutions\n✓ IT Hardware & Accessories\n✓ Collaboration & Telephony\n✓ ICT Solutions\n✓ Support Management\n\nWhich interests you?",
  cctv: "Our CCTV Security Solutions:\n📹 Hikvision Dome Camera 4MP (In stock: 15 units)\n📹 Hikvision Turret Camera 2MP (In stock: 8 units)\n\n24/7 surveillance systems. Want a quote?",
  hardware: "Current IT Hardware in stock:\n💻 Cisco PoE Switch 48-Port (3 units)\n⚡ Dell UPS 3KVA (5 units)\n🖥️ HP Enterprise Server (2 units)\n📡 Ubiquiti WiFi 6 Access Point (7 units)\n\nNeed something specific?",
  telephony: "Collaboration & Telephony:\n☎️ Cisco IP Phone 8861 (In stock: 12 units)\n\nModern voice & messaging tools. Interested?",
  security: "Security Products:\n🔐 Fortinet Firewall FortiGate 30E (4 units)\n\nEnterprise-grade protection available.",
  stock: "What's in stock today:\n📹 CCTV Cameras (Hikvision)\n☎️ Cisco IP Phones (12 units)\n🔐 Fortinet Firewalls (4 units)\n💻 Cisco Network Switches (3 units)\n⚡ Power Solutions\n🖥️ Enterprise Servers\n📡 WiFi Access Points (7 units)\n\nWhich interests you?",
  quote: "Perfect! 📋 I'll send your inquiry to sales@kelson.co.zm\n\nLet me get your details. What's your name?",
  contact: "📞 Contact Kelson Innovations:\n☎️ +260 211 261 000\n📧 sales@kelson.co.zm\n📍 Woodlands Mall, Shop Number 16D, Lusaka, Zambia\n\nMon-Sat: 8am-5pm",
  hours: "Business Hours:\nMonday - Saturday: 8:00 AM - 5:00 PM\nSunday: Closed",
  address: "📍 Woodlands Mall, Shop Number 16D, Lusaka, Zambia",
  network: "📡 NETWORK RECOMMENDATION:\nFor multi-floor building coverage:\n✓ Ubiquiti WiFi 6 APs (we have 7 in stock)\n✓ Cisco PoE Switch (3 units available)\n✓ Mesh networking for seamless roaming\n✓ Same SSID across all floors\n✓ Non-overlapping channel planning\n\nRecommend 1 AP per floor. Want specific details?",
  wifi: "📡 WiFi COVERAGE SOLUTION:\nFor large buildings:\n1. Multiple WiFi 6 Access Points (mesh-enabled)\n2. Centralized PoE power & data switch\n3. Ethernet backbone between floors\n4. Proper placement (40-50ft spacing)\n5. Professional channel configuration\n\nPerfect for offices, hotels, apartments. Need a quote?",
  building: "🏢 BUILDING NETWORK SOLUTION:\n✓ 1 Access Point per floor minimum\n✓ Ubiquiti WiFi 6 (excellent signal penetration)\n✓ Cisco PoE Switch powers everything\n✓ Mesh networking (seamless roaming)\n✓ Unified same-network experience\n\nFor 5-story building: ~5 APs + 1 PoE Switch. Ready for quote?",
  coverage: "📍 COVERAGE RECOMMENDATIONS:\n→ For residential: 1 AP per 1500 sq ft\n→ For commercial: 1 AP per 2000 sq ft\n→ PoE switches eliminate power limitations\n→ Mesh allows seamless floor-to-floor roaming\n→ WiFi 6 (6GHz) penetrates walls better\n\nTell us your building size?",
  wan: "🌐 WAN SOLUTIONS (10+ KM APART):\n✓ Licensed Microwave Link (10-50 KM)\n✓ Point-to-Point Wireless (Line of sight)\n✓ Fiber Optic Cables (Most reliable)\n✓ VPN over Internet (Redundant backup)\n✓ MPLS Leased Lines (Carrier-provided)\n\nBest for Lusaka: Microwave + Fiber hybrid. Details?",
  distance: "📡 MULTI-BUILDING CONNECTIVITY (WAN):\nFor buildings 10 KM+ apart:\n\n1️⃣ MICROWAVE LINK (Best):\n   • Line-of-sight P2P\n   • 50Mbps-1Gbps speed\n   • Fast deployment\n\n2️⃣ FIBER OPTIC:\n   • Unlimited bandwidth\n   • Most reliable\n   • Higher initial cost\n\n3️⃣ VPN + Internet:\n   • Backup option\n   • Cost-effective\n\nWe can design & install. Ready for quote?",
  microwave: "📡 MICROWAVE P2P SOLUTION (10-50 KM):\n✓ Licensed spectrum (LOS only)\n✓ Fortinet firewalls secure endpoints\n✓ 50Mbps - 1Gbps throughput\n✓ Low latency (<10ms)\n✓ Weather-resistant (rain fade considerations)\n\nPerfect for Lusaka climate. Need details?",
  fiber: "🔌 FIBER OPTIC BACKBONE:\n✓ Unlimited bandwidth\n✓ No distance limitations\n✓ Buried or aerial installation\n✓ Cisco switches manage bandwidth\n✓ Most expensive upfront\n\nBest long-term solution. Interested?",
  vpn: "🔐 VPN + INTERNET BACKUP:\n✓ Uses existing internet connections\n✓ Cost-effective failover\n✓ Fortinet firewalls enforce security\n✓ Slower than dedicated links\n✓ Redundancy with microwave/fiber\n\nGreat as secondary network. Details?",
  signal: "📊 SIGNAL STRENGTH OPTIMIZATION:\n✓ Mesh WiFi 6 (automatic roaming)\n✓ Central placement on each floor\n✓ PoE-powered for consistent performance\n✓ Non-overlapping channels\n✓ Proper antenna positioning\n\nOur Ubiquiti APs maintain -70dBm minimum. Details?",
  thank: "You're welcome! Anything else?",
  thanks: "You're welcome! Anything else?",
  bye: "Thanks for chatting! 👋",
  default: "I can help with:\n• 'What's in stock?'\n• Network/WiFi coverage solutions\n• 'Tell me about CCTV'\n• 'Get me a quote'\n• 'Contact info'\n\nOr call: +260 211 261 000",
};

function findBestResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // WAN/Distance-based recommendations (buildings far apart)
  if ((lowerMessage.includes("km") || lowerMessage.includes("kilometer") || lowerMessage.includes("apart") || 
       lowerMessage.includes("distance") || lowerMessage.includes("far")) &&
      (lowerMessage.includes("building") || lowerMessage.includes("office") || lowerMessage.includes("site") ||
       lowerMessage.includes("network") || lowerMessage.includes("connect"))) {
    return BOT_RESPONSES.distance;
  }
  if (lowerMessage.includes("microwave") || (lowerMessage.includes("point") && lowerMessage.includes("point"))) {
    return BOT_RESPONSES.microwave;
  }
  if (lowerMessage.includes("fiber") || lowerMessage.includes("fibre")) {
    return BOT_RESPONSES.fiber;
  }
  if (lowerMessage.includes("vpn") || (lowerMessage.includes("internet") && lowerMessage.includes("backup"))) {
    return BOT_RESPONSES.vpn;
  }
  if (lowerMessage.includes("wan") || (lowerMessage.includes("wide") && lowerMessage.includes("area"))) {
    return BOT_RESPONSES.wan;
  }
  
  // Network/WiFi coverage recommendations
  if ((lowerMessage.includes("building") || lowerMessage.includes("floor") || lowerMessage.includes("story")) && 
      (lowerMessage.includes("network") || lowerMessage.includes("wifi") || lowerMessage.includes("signal"))) {
    return BOT_RESPONSES.building;
  }
  if ((lowerMessage.includes("same") || lowerMessage.includes("uniform")) && 
      (lowerMessage.includes("network") || lowerMessage.includes("signal") || lowerMessage.includes("wifi"))) {
    return BOT_RESPONSES.network;
  }
  if (lowerMessage.includes("wifi") || lowerMessage.includes("coverage")) {
    return BOT_RESPONSES.wifi;
  }
  if (lowerMessage.includes("signal") && (lowerMessage.includes("strength") || lowerMessage.includes("signal"))) {
    return BOT_RESPONSES.signal;
  }
  if (lowerMessage.includes("coverage") || (lowerMessage.includes("access") && lowerMessage.includes("point"))) {
    return BOT_RESPONSES.coverage;
  }
  
  // Direct keyword matching
  for (const [key, response] of Object.entries(BOT_RESPONSES)) {
    if (key === "default") continue;
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  // Check for multiple keywords
  if ((lowerMessage.includes("what") || lowerMessage.includes("tell")) && lowerMessage.includes("service")) {
    return BOT_RESPONSES.services;
  }
  if ((lowerMessage.includes("how") || lowerMessage.includes("get")) && lowerMessage.includes("touch")) {
    return BOT_RESPONSES.contact;
  }
  
  return BOT_RESPONSES.default;
}

export default function CustomChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 Welcome to Kelson Innovations. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCapturingLead, setIsCapturingLead] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
  });

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Lead capture flow
    if (isCapturingLead) {
      if (!leadData.name) {
        setLeadData({ ...leadData, name: inputValue });
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), text: inputValue, sender: "user", timestamp: new Date() },
          { id: (Date.now() + 1).toString(), text: "Thanks! Now your email?", sender: "bot", timestamp: new Date() },
        ]);
        setInputValue("");
        return;
      } else if (!leadData.email) {
        setLeadData({ ...leadData, email: inputValue });
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), text: inputValue, sender: "user", timestamp: new Date() },
          { id: (Date.now() + 1).toString(), text: "Great! Your phone number?", sender: "bot", timestamp: new Date() },
        ]);
        setInputValue("");
        return;
      } else if (!leadData.phone) {
        setLeadData({ ...leadData, phone: inputValue });
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), text: inputValue, sender: "user", timestamp: new Date() },
          { id: (Date.now() + 1).toString(), text: "Perfect! What product/service are you interested in?", sender: "bot", timestamp: new Date() },
        ]);
        setInputValue("");
        return;
      } else if (!leadData.inquiry) {
        setLeadData({ ...leadData, inquiry: inputValue });
        setInputValue("");
        setIsLoading(true);

        // Send lead to API
        try {
          const response = await fetch("/api/chatbot/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: leadData.name,
              email: leadData.email,
              phone: leadData.phone,
              inquiry: inputValue,
              interest: inputValue.substring(0, 50),
            }),
          });

          const result = await response.json();

          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), text: inputValue, sender: "user", timestamp: new Date() },
            {
              id: (Date.now() + 1).toString(),
              text: response.ok
                ? "✅ Perfect! Your inquiry has been sent to our sales team at sales@kelson.co.zm\n\nThey'll contact you at " + leadData.email + " shortly.\n\nIs there anything else I can help with?"
                : "❌ There was an issue. Please call us at +260 211 261 000",
              sender: "bot",
              timestamp: new Date(),
            },
          ]);

          setIsCapturingLead(false);
          setLeadData({ name: "", email: "", phone: "", inquiry: "" });
        } catch (error) {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              text: "❌ Error sending inquiry. Call us: +260 211 261 000",
              sender: "bot",
              timestamp: new Date(),
            },
          ]);
        }
        setIsLoading(false);
        return;
      }
    }

    // Regular message handling
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Check if asking for quote
    if (inputValue.toLowerCase().includes("quote")) {
      setIsCapturingLead(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Perfect! 📋 I'll capture your details and send them to our sales team.\n\nLet me start - what's your name?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const botResponse = findBestResponse(inputValue);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition hover:bg-brand-700 hover:shadow-xl dark:bg-brand-500 dark:hover:bg-brand-600"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[600px] w-[420px] flex-col rounded-lg border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-950 sm:w-[380px] md:w-[420px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-brand-600 px-4 py-3 text-white dark:border-slate-700 dark:bg-brand-700 rounded-t-lg">
            <div>
              <h2 className="font-semibold">Kelson Support</h2>
              <p className="text-xs opacity-90">Usually responds instantly</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="rounded p-1 hover:bg-brand-700 dark:hover:bg-brand-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                    message.sender === "user"
                      ? "bg-brand-600 text-white dark:bg-brand-700"
                      : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                  }`}
                >
                  {message.text.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce delay-100" />
                    <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950 rounded-b-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isCapturingLead ? "Type your response..." : "Type a message..."}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-600 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:border-brand-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="rounded-lg bg-brand-600 p-2 text-white hover:bg-brand-700 disabled:opacity-50 dark:bg-brand-700 dark:hover:bg-brand-600"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
