import os
import json
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = int(os.environ.get("PORT", 8000))
HOST = "0.0.0.0"

# Setu AI Logic Engine
def generate_setu_reply(message, language, role, context):
    msg_lower = message.lower()
    
    if language == 'te':
        if "మద్దతు ధర" in msg_lower or "ధర" in msg_lower or "price" in msg_lower or "rate" in msg_lower:
            if role == 'buyer':
                return "ప్రస్తుతం మార్కెట్‌లో గ్రేడ్ A టమోటా ధర ₹28/కేజీ, ఉల్లిపాయ ₹34/కేజీ, గుంటూరు ఎండుమిర్చి ₹195/కేజీ. ఈ వారం ప్రారంభంలో తాజా రాకల వల్ల ధరలు అనుకూలంగా ఉన్నాయి."
            return "ఈ రోజు మార్కెట్‌లో టమోటా ధర ₹28/కేజీ వద్ద ఉంది. రాబోయే 3 రోజుల్లో ధర స్థిరంగా ఉంటుందని అంచనా. అధిక డిమాండ్ ఉన్న కొనుగోలుదారులతో అనుసంధానం కావడానికి 'Find Buyers' విభాగం చూడండి."
        elif "కొనుగోలుదారులు" in msg_lower or "buyer" in msg_lower or "కొనుగోలు" in msg_lower or "sell" in msg_lower:
            return "మీ పంట (టమోటాలు 500 కేజీలు) కోసం 3 సరిపోయే ధృవీకరించబడిన కొనుగోలుదారులు ఉన్నారు! FreshMart Wholesale ₹29/కేజీ ఆఫర్ చేస్తోంది (94% మ్యాచ్). తక్షణ డీల్ కోసం 'Find Buyers' క్లిక్ చేయండి."
        elif "ఆర్డర్" in msg_lower or "order" in msg_lower or "డెలివరీ" in msg_lower or "track" in msg_lower:
            return "మీ ఆర్డర్ #AGC1024 ప్రస్తుతం మార్గమధ్యంలో (In Transit) ఉంది. అంచనా డెలివరీ సమయం: సాయంత్రం 4:30. డ్రైవర్ రూట్ 92% సామర్థ్యంతో సాగుతోంది."
        elif "పంటలు" in msg_lower or "సరుకు" in msg_lower or "కూరగాయలు" in msg_lower or "products" in msg_lower:
            return "అగ్రి కనెక్ట్ మార్కెట్‌ప్లేస్‌లో ఆకుకూరలు, దుంప కూరలు, సీజనల్ కూరలు, మసాలాలు మరియు కాయగూరల విభాగాలుగా 27 రకాల తాజా పంటలు అందుబాటులో ఉన్నాయి."
        else:
            return f"నమస్కారం! నేను సేతు (SETU AI). AgriConnect ప్లాట్‌ఫారమ్‌లో మీకు సాయపడటానికి ఇక్కడ ఉన్నాను. ధరల సమాచారం, కొనుగోలుదారుల మ్యాచ్, లేదా ఆర్డర్ ట్రాకింగ్ గురించి నన్ను అడగండి."
    elif language == 'hi':
        if "कीमत" in msg_lower or "भाव" in msg_lower or "price" in msg_lower or "rate" in msg_lower:
            if role == 'buyer':
                return "आज मंडी में ग्रेड A टमाटर का भाव ₹28/किग्रा, प्याज ₹34/किग्रा और गुंटूर लाल मिर्च ₹195/किग्रा है। ताजा आवक के कारण कीमतें अनुकूल हैं।"
            return "आज मंडी में टमाटर का भाव ₹28/किग्रा है। अगले 3 दिनों में मांग अधिक रहने का अनुमान है। बेहतर दाम के लिए Verified Buyers से सीधे जुड़ें।"
        elif "खरीदार" in msg_lower or "buyer" in msg_lower or "बेचना" in msg_lower:
            return "आपकी फसल (टमाटर 500 किग्रा) के लिए 3 उपयुक्त खरीदार मिले हैं! FreshMart Wholesale ₹29/किग्रा का प्रस्ताव दे रहा है (94% मैच)।"
        elif "ऑर्डर" in msg_lower or "order" in msg_lower or "डिलीवरी" in msg_lower or "track" in msg_lower:
            return "आपका ऑर्डर #AGC1024 रास्ते में है (In Transit)। अनुमानित डिलीवरी समय: शाम 4:30 बजे। डिलीवरी दूरी: 18 किमी।"
        elif "उत्पाद" in msg_lower or "सब्जियां" in msg_lower or "products" in msg_lower:
            return "एग्री कनेक्ट पर 5 श्रेणियों (पत्तेदार, जड़ वाली, मौसमी, मसाले, फलदार सब्जियां) में सभी 27 फसलें किसानों से सीधे उपलब्ध हैं।"
        else:
            return f"नमस्ते! मैं सेतु (SETU AI) हूँ। AgriConnect पर फसल बेचने, मंडी भाव जानने या खरीदार ढूंढने में मैं आपकी सहायता कर सकता हूँ।"
    else:
        # English
        if "price" in msg_lower or "rate" in msg_lower or "mandi" in msg_lower:
            if role == 'buyer':
                return "Today's benchmark prices: Grade A Tomato is ₹28/kg, Red Onion is ₹34/kg, and Guntur Red Chilli is ₹195/kg. Prices are 12% below weekly average due to fresh arrivals."
            return "Today's benchmark price for Grade A Tomato is ₹28/kg. Market demand is currently HIGH with supply deficit expected this week. We recommend listing your produce at ₹27-₹29/kg."
        elif "buyer" in msg_lower or "sell" in msg_lower or "match" in msg_lower:
            return "SETU matched 3 top verified buyers for your produce! FreshMart Wholesale offers ₹29/kg for 300kg (94% match, 18km away). Click 'Find Buyers' to confirm the deal."
        elif "order" in msg_lower or "track" in msg_lower or "delivery" in msg_lower or "logistics" in msg_lower:
            return "Order #AGC1024 is currently IN TRANSIT. Vehicle is 18 km away from delivery destination with an ETA of 4:30 PM. Smart Logistics route efficiency is 92%."
        elif "verify" in msg_lower or "farmer" in msg_lower or "proof" in msg_lower or "aadhaar" in msg_lower:
            return "Verified Farmers on AgriConnect receive 35% more direct buyer offers! Complete your Government ID verification in Profile or Farmer Registration to unlock the 🟢 Verified Farmer badge."
        elif "product" in msg_lower or "crop" in msg_lower or "vegetable" in msg_lower or "spice" in msg_lower:
            return "AgriConnect features 27 fresh farm produce items across 5 categories: Leafy Vegetables (4), Root Vegetables (7), Seasonal Vegetables (5), Indian Spices (4), and Fruiting Vegetables (7)."
        else:
            return f"Hello! I am SETU, your AgriConnect AI Market Assistant. I can help you find verified buyers, check real-time mandi crop prices, forecast market demand, or track smart logistics!"

class AgriConnectRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        
        if parsed_url.path == '/api/setu/chat':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            try:
                data = json.loads(body.decode('utf-8'))
                message = data.get('message', '')
                language = data.get('language', 'en')
                role = data.get('role', 'farmer')
                context = data.get('context', {})
                
                reply = generate_setu_reply(message, language, role, context)
                
                response_data = {
                    "status": "success",
                    "reply": reply,
                    "language": language,
                    "role": role,
                    "timestamp": "2026-08-30T09:05:00Z"
                }
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response_data).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
            return

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"message": "Action received"}).encode('utf-8'))

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        if parsed_url.path.startswith('/api/'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            if parsed_url.path == '/api/health':
                self.wfile.write(json.dumps({"status": "online", "app": "AgriConnect Backend"}).encode('utf-8'))
            else:
                self.wfile.write(json.dumps({"status": "ok"}).encode('utf-8'))
            return

        return super().do_GET()

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = HTTPServer((HOST, PORT), AgriConnectRequestHandler)
    print(f"[AgriConnect] Server running at http://localhost:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == '__main__':
    run_server()
