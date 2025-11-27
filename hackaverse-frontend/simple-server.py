import http.server
import socketserver
import os

# Change to the frontend directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8000

# Create a simple HTTP request handler
Handler = http.server.SimpleHTTPRequestHandler

# Start the server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    print("Press Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")