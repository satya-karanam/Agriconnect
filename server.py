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
                return "ప్రస్తుతం మార్కెట్‌లో గ్రేడ్ A టమోటా ధర ₹28/కేజీ, ఉల్లిపాయ ₹34/కేజీ. 100% ఆదాయం నేరుగా రైతుకే అందుతుంది (0% కమిషన్)."
            return "ఈ రోజు మార్కెట్‌లో టమోటా ధర ₹28/కేజీ వద్ద ఉంది. రాబోయే 3 రోజుల్లో ధర స్థిరంగా ఉంటుందని అంచనా. అధిక డిమాండ్ ఉన్న కొనుగోలుదారులతో అనుసంధానం కావడానికి 'Find Buyers' విభాగం చూడండి."
        elif "కొనుగోలుదారులు" in msg_lower or "buyer" in msg_lower or "కొనుగోలు" in msg_lower or "sell" in msg_lower:
            return "మీ పంట కోసం 3 సరిపోయే ధృవీకరించబడిన కొనుగోలుదారులు ఉన్నారు! FreshMart Wholesale ₹29/కేజీ ఆఫర్ చేస్తోంది."
        elif "ఆర్డర్" in msg_lower or "order" in msg_lower or "డెలివరీ" in msg_lower or "track" in msg_lower:
            return "మీ ఆర్డర్ #AGC1024 ప్రస్తుతం మార్గమధ్యంలో (In Transit) ఉంది. అంచనా డెలివరీ సమయం: సాయంత్రం 4:30."
        elif "freshness" in msg_lower or "తాజా" in msg_lower or "పంటలు" in msg_lower:
            return "విశాఖపట్నం మరియు గుంటూరు క్లస్టర్ల నుండి ప్రతీ రోజు తాజా పంట మార్కెట్‌లోకి వస్తుంది. 100% నాణ్యమైన కాయగూరలు అందుబాటులో ఉన్నాయి."
        else:
            return f"నమస్కారం! నేను సేతు (SETU AI). మీ కొనుగోలు సహాయకుడిని. తాజా పంటలు, రైతు చెల్లింపులు, లేదా నాణ్యతా వివరాలు నన్ను అడగండి."
    else:
        # English / Default
        if "freshness" in msg_lower or "fresh" in msg_lower or "season" in msg_lower or "availability" in msg_lower:
            return "🌿 Local Grade A produce is harvested daily from nearby Visakhapatnam & Guntur clusters. Peak availability currently: Tomatoes, Red Onions, and Brinjal."
        elif "farmer" in msg_lower or "money" in msg_lower or "payout" in msg_lower or "commission" in msg_lower:
            return "💰 100% of your produce payment goes directly to the verified farmer through AgriConnect Smart Escrow (0% intermediary commission)."
        elif "location" in msg_lower or "grade" in msg_lower or "farm" in msg_lower:
            return "📍 Our verified farms are located in Visakhapatnam, Krishna, and Guntur districts. All produce is graded (Grade A Export, Grade B Standard) before dispatch."
        elif "price" in msg_lower or "rate" in msg_lower or "mandi" in msg_lower:
            if role == 'buyer':
                return "Today's benchmark prices: Grade A Tomato is ₹28/kg, Red Onion is ₹34/kg, and Guntur Red Chilli is ₹195/kg. Direct farm-to-table pricing with 0% markup."
            return "Today's benchmark price for Grade A Tomato is ₹28/kg. Market demand is currently HIGH with supply deficit expected this week."
        elif "buyer" in msg_lower or "sell" in msg_lower or "match" in msg_lower:
            return "SETU matched 3 top verified buyers for your produce! FreshMart Wholesale offers ₹29/kg for 300kg (94% match, 18km away)."
        elif "order" in msg_lower or "track" in msg_lower or "delivery" in msg_lower:
            return "Order #AGC1024 is currently IN TRANSIT. Vehicle is 18 km away from delivery destination with an ETA of 4:30 PM."
        else:
            if role == 'buyer':
                return "Hello! I am SETU, your Consumer Freshness & Fair-Trade Assistant. I can help you check local produce freshness, track farm sources, and verify direct farmer payouts!"
            return "Hello! I am SETU, your AgriConnect AI Market Assistant. I can help you find verified buyers, check real-time mandi crop prices, forecast market demand, or track smart logistics!"

class AgriConnectRequestHandler(SimpleHTTPRequestHandler):
    extensions_map = SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map['.jsx'] = 'application/javascript'
    extensions_map['.js'] = 'application/javascript'

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
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
