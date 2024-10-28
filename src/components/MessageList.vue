<template>
    <div class="message-list-container">
      <h1 class="title">Messages</h1>
      <ul class="message-list">
        <li v-for="message in messages" :key="message.id" class="message-item">
          <span class="message-content">{{ message.content }}</span>
          <div class="message-actions">
            <button class="action-button edit" @click="editMessage(message)">Edit</button>
            <button class="action-button delete" @click="deleteMessage(message.id)">Delete</button>
          </div>
        </li>
      </ul>
      <button class="action-button refresh" @click="fetchMessages">Refresh Messages</button>
      
      <h2 class="form-title" v-if="isEditing">Edit Message</h2>
      <h2 class="form-title" v-else>Create Message</h2>
      
      <input v-model="newMessage" class="message-input" placeholder="Enter message" />
      <button class="action-button submit" @click="isEditing ? updateMessage() : createMessage()">
        {{ isEditing ? 'Update Message' : 'Create Message' }}
      </button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        messages: [],
        newMessage: '',
        isEditing: false,
        editingMessageId: null,
      };
    },
    methods: {
      async fetchMessages() {
        try {
          const response = await axios.get('http://localhost:3000/messages');
          this.messages = response.data;
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      },
      async createMessage() {
        try {
          const response = await axios.post('http://localhost:3000/messages', {
            content: this.newMessage,
          });
          this.messages.push(response.data);
          this.newMessage = ''; // Clear input field
        } catch (error) {
          console.error("Error creating message:", error);
        }
      },
      async updateMessage() {
        try {
          const response = await axios.put(`http://localhost:3000/messages/${this.editingMessageId}`, {
            content: this.newMessage,
          });
          const index = this.messages.findIndex(msg => msg.id === this.editingMessageId);
          this.messages.splice(index, 1, response.data); // Update the message in the list
          this.newMessage = ''; // Clear input field
          this.isEditing = false; // Reset editing state
          this.editingMessageId = null; // Reset editing message ID
        } catch (error) {
          console.error("Error updating message:", error);
        }
      },
      async deleteMessage(id) {
        try {
          await axios.delete(`http://localhost:3000/messages/${id}`);
          this.messages = this.messages.filter(msg => msg.id !== id); // Remove the deleted message
        } catch (error) {
          console.error("Error deleting message:", error);
        }
      },
      editMessage(message) {
        this.newMessage = message.content;
        this.isEditing = true;
        this.editingMessageId = message.id; // Store the ID of the message being edited
      },
    },
    mounted() {
      this.fetchMessages();
    },
  };
  </script>
  
  <style scoped>
  .message-list-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
    color: #343a40;
  }
  
  .message-list {
    list-style-type: none;
    padding: 0;
  }
  
  .message-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    margin-bottom: 10px;
    transition: background-color 0.3s;
  }
  
  .message-item:hover {
    background-color: #f1f1f1;
  }
  
  .message-content {
    flex-grow: 1;
  }
  
  .message-actions {
    display: flex;
    gap: 10px;
  }
  
  .action-button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .action-button.edit {
    background-color: #007bff;
    color: white;
  }
  
  .action-button.edit:hover {
    background-color: #0056b3;
  }
  
  .action-button.delete {
    background-color: #dc3545;
    color: white;
  }
  
  .action-button.delete:hover {
    background-color: #c82333;
  }
  
  .action-button.refresh {
    background-color: #17a2b8;
    color: white;
    margin-bottom: 20px;
  }
  
  .action-button.refresh:hover {
    background-color: #138496;
  }
  
  .form-title {
    margin: 20px 0 10px;
    text-align: center;
    font-size: 1.5rem;
  }
  
  .message-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    margin-bottom: 10px;
    transition: border-color 0.3s;
  }
  
  .message-input:focus {
    border-color: #80bdff;
    outline: none;
  }
  
  .submit {
    background-color: #28a745;
    color: white;
    width: 100%;
  }
  
  .submit:hover {
    background-color: #218838;
  }
  </style>
  