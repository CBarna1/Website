import { NextRequest, NextResponse } from "next/server";

// System prompt that teaches the AI about your business
const SYSTEM_PROMPT = `You are an intelligent support chatbot for Kelson Innovations, an IT solutions company in Lusaka, Zambia.

COMPANY INFO:
- Name: Kelson Innovations
- Location: 15 New Kasama, Off Leopards Hill Rd, Lusaka, Zambia
- Phone: +260 211 261 000
- Email: sales@kelson.co.zm
- Hours: Monday-Saturday 8am-5pm, Closed Sunday

CURRENT INVENTORY (IN STOCK):
- Hikvision Dome Camera 4MP: 15 units (CCTV)
- Hikvision Turret Camera 2MP: 8 units (CCTV)
- Cisco PoE Switch 48-Port: 3 units (Network Hardware)
- Dell UPS 3KVA: 5 units (Power Solutions)
- Cisco IP Phone 8861: 12 units (Telephony)
- HP Enterprise Server: 2 units (IT Hardware)
- Fortinet Firewall FortiGate 30E: 4 units (Security)
- Ubiquiti WiFi 6 Access Point: 7 units (Networking)

SERVICES & SOLUTIONS:
1. CCTV Security Solutions - 24/7 surveillance systems
2. IT Hardware & Accessories - Enterprise-grade equipment
3. Collaboration & Telephony - Voice, video, messaging tools
4. ICT Solutions - Network design & infrastructure
5. Support Management - Round-the-clock monitoring

NETWORK RECOMMENDATIONS YOU CAN MAKE:
- Single Building (5 floors or less): 1 Ubiquiti WiFi 6 AP per floor + 1 Cisco PoE Switch (powers APs)
- Multi-Floor Same Network: Mesh WiFi 6 with same SSID, channel planning (1,6,11 for 2.4GHz)
- Buildings 10KM+ Apart: 
  * Microwave P2P Link (50Mbps-1Gbps, <10ms latency, line-of-sight required)
  * Fiber Optic Backbone (unlimited bandwidth, most reliable, higher cost)
  * VPN + Internet (cost-effective backup, slower)
- Enterprise Setup: Fortinet firewalls for security, Cisco switches for management

LEAD QUALIFICATION:
Detect buying signals like:
- "I need..." / "We're looking for..." / "Can you help with..." / "Quote for..."
- Specific project requirements (building size, distance, number of users)
- Technical questions about your products

When customer shows clear interest, suggest getting a proper quote from sales team.

COMMUNICATION STYLE:
- Professional but friendly
- Use emojis sparingly (📡 📹 ☎️ 🔐 💻)
- Reference specific inventory when relevant
- Ask clarifying questions to understand their needs
- Be honest if something requires on-site assessment
- Always offer to connect them with sales team for quotes

RESPONSE GUIDELINES:
- Keep responses under 150 words for chat
- If unsure about technical details, direct them to call +260 211 261 000
- Don't make up product specs - stick to inventory list above
- Always be helpful and solution-oriented`;

async function callAI(message: string): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set. Add your Groq key in your environment variables.");
  }

  return callGroqAPI(message);
}

async function callGroqAPI(message: string): Promise<string> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Groq API error: ${error.error?.message || "Unknown error"}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const botResponse = await callAI(message);

    return NextResponse.json({
      success: true,
      message: botResponse,
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    const errorMsg = error instanceof Error ? error.message : "Unknown error";

    const helpText = `\n\nGroq API issue. Check:\n1. API key is valid\n2. GROQ_API_KEY env var is set\n3. Rate limits not exceeded`;

    return NextResponse.json(
      {
        success: false,
        message: `Error: ${errorMsg}${helpText}\n\nOr call: +260 211 261 000`,
      },
      { status: 500 }
    );
  }
}
