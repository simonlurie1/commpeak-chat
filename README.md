# CommPeak React Practical Task

This project is a solution to the **CommPeak Inbox Page Implementation** challenge. It is a React + TypeScript frontend app that simulates a basic messaging UI with contacts and conversations.

## 🧱 Features

- ✅ **Contact List Sidebar**
    - Shows contact's full name, last message preview, and timestamp.
    - Click to open the conversation.

- ✅ **Conversation Panel**
    - Displays message bubbles with left/right alignment (incoming/outgoing).
    - Shows avatar (initials), total messages, and contact name.

- ✅ **Send Message**
    - Input at bottom of chat.
    - Supports dynamic placeholders like `[first_name]` → replaced on send.

- ✅ **Real-Time Search**
    - Case-insensitive.
    - Filter contacts by full name or phone number.

- ✅ **Frontend Only**
    - No localStorage or backend — state resets on page refresh.

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
npm run dev