from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import time
import asyncio

router = APIRouter()

class AgentRequest(BaseModel):
    message: str
    context: Optional[str] = None

class AgentResponse(BaseModel):
    response: str
    reasoning: Optional[str] = None
    timestamp: float

@router.post("/", response_model=AgentResponse)
async def chat_with_agent(request: AgentRequest):
    """Chat with AI agent for hackathon assistance."""

    # Simulate AI processing time
    await asyncio.sleep(1.5)

    # Mock AI responses based on message content
    message_lower = request.message.lower()

    if "score my project" in message_lower:
        response = {
            "response": "I'd be happy to help score your project! Based on typical hackathon criteria, here's my assessment:\n\n🏆 **Innovation**: 8/10 - Good use of technology\n🔧 **Technical**: 7/10 - Solid implementation\n🎯 **Impact**: 9/10 - Addresses real problem\n📊 **Presentation**: 6/10 - Could use better demo\n\n**Overall**: 75/100 - Great potential!",
            "reasoning": "Analyzed project based on standard hackathon judging criteria including innovation, technical execution, impact, and presentation quality.",
            "timestamp": time.time()
        }
    elif "suggest features" in message_lower:
        response = {
            "response": "Here are some feature suggestions for your project:\n\n✨ **Core Features**:\n• User authentication and profiles\n• Real-time notifications\n• Search and filtering\n• Export functionality\n\n🚀 **Advanced Features**:\n• AI-powered recommendations\n• Social sharing\n• Analytics dashboard\n• Mobile app companion",
            "reasoning": "Generated feature suggestions based on common hackathon project needs and current technology trends.",
            "timestamp": time.time()
        }
    elif "fix readme" in message_lower:
        response = {
            "response": "I can help improve your README! Here's a better structure:\n\n# Project Name\n\n## 🎯 Problem Statement\n[Describe the problem you're solving]\n\n## 💡 Solution\n[Your innovative approach]\n\n## 🛠️ Tech Stack\n[List technologies used]\n\n## 🚀 Getting Started\n[Installation & setup steps]\n\n## 📱 Features\n[Key functionality]\n\n## 🏆 Demo\n[Screenshots/video links]",
            "reasoning": "Provided standard README template with essential sections that judges and users expect to see.",
            "timestamp": time.time()
        }
    else:
        response = {
            "response": "That's an interesting question! I can help you with various aspects of your hackathon project. Would you like me to:\n\n• Review your code or architecture\n• Suggest improvements or new features\n• Help with presentation strategies\n• Provide technical guidance\n• Assist with team coordination\n\nWhat specific area would you like to focus on?",
            "reasoning": "Generated a helpful response offering various types of assistance available to hackathon participants.",
            "timestamp": time.time()
        }

    return AgentResponse(**response)
