# 🤖 AI Chatbot Setup Guide - Ollama

## ⚡ Quick Start (3 Steps)

### Step 1: Install Ollama
```
1. Go to https://ollama.ai
2. Download and install for your OS
3. Open it (it will show a menu)
```

### Step 2: Download AI Model (Mistral)
Open Terminal or PowerShell and run:
```bash
ollama pull mistral
```
⏱️ Takes 5-10 minutes (downloading 3.5GB AI model)

### Step 3: Start the Server
Keep this running while using the chatbot:
```bash
ollama serve
```

✅ **Done!** Your chatbot is now AI-powered!

---

## 🧪 Test It

1. Open http://localhost:3000
2. Click the chat button (bottom right corner)
3. Ask any question like:
   - "We need WiFi coverage for a 5-story building"
   - "What's your recommendation for 3 offices 10km apart?"
   - "Do you have Hikvision cameras in stock?"
   - "I need a quote for network setup"

The AI will understand and respond naturally! 🎯

---

## 📊 What Makes It Intelligent

The chatbot now:
- ✅ **Understands context** - Not just keyword matching
- ✅ **Knows your inventory** - 8 products with real stock levels
- ✅ **Makes recommendations** - Based on customer needs
- ✅ **Stays in character** - Sounds like your sales team
- ✅ **Handles any question** - Not limited to predetermined responses
- ✅ **Completely free** - Runs locally, no API costs

---

## 🔧 System Prompt (What It Knows)

The AI has been trained on:
- Your company info
- All 8 products in inventory
- Network solutions (LAN, WAN, microwave, fiber)
- Pricing & contact info
- Professional communication style

---

## 🚨 Troubleshooting

**"Error: Connection refused"**
→ Make sure `ollama serve` is running in terminal

**"Chatbot is slow"**
→ First response takes 5-10 seconds while model loads (normal)

**"Model not found"**
→ Run: `ollama pull mistral`

**"Missing Ollama"**
→ Download from https://ollama.ai

---

## 📝 Customization

Want to change what the AI says?

Edit: `app/api/chatbot/intelligent/route.ts`

Find `SYSTEM_PROMPT` and update:
- Inventory items
- Services offered
- Company details
- Communication style

Then restart your dev server.

---

## 🎯 Result

Your chatbot is now a **true AI assistant** that:
- Answers questions naturally
- Recommends solutions
- Captures leads
- Sounds professional
- Never gets boring (always learning)

Enjoy! 🚀
