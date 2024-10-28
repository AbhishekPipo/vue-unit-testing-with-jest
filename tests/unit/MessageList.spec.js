import { mount } from '@vue/test-utils';
import MessageList from '@/components/MessageList.vue';
import axios from 'axios';
import flushPromises from 'flush-promises';

jest.mock('axios');

describe('MessageList.vue', () => {
  it('fetches and displays messages from the API', async () => {
    const messages = [
      { id: 1, content: 'Hello from JSON Server!' },
      { id: 2, content: 'Another message!' },
    ];

    axios.get.mockResolvedValue({ data: messages });

    const wrapper = mount(MessageList);
    
    // Wait for any promises to resolve
    await flushPromises();

    // Check if messages are displayed
    const messageItems = wrapper.findAll('.message-item'); // Use the updated class
    expect(messageItems).toHaveLength(messages.length);
    expect(messageItems.at(0).find('.message-content').text()).toBe(messages[0].content); // Updated selector
    expect(messageItems.at(1).find('.message-content').text()).toBe(messages[1].content); // Updated selector
  });

  it('refreshes messages on button click', async () => {
    const initialMessages = [
      { id: 1, content: 'Hello from JSON Server!' },
    ];

    axios.get.mockResolvedValueOnce({ data: initialMessages });

    const wrapper = mount(MessageList);
    await flushPromises(); // Wait for the initial fetch

    // Verify initial fetch
    expect(wrapper.findAll('.message-item')).toHaveLength(1);
    
    // Simulate button click to refresh
    const newMessages = [
      { id: 2, content: 'Another message!' },
    ];
    axios.get.mockResolvedValueOnce({ data: newMessages });
    
    await wrapper.find('.action-button.refresh').trigger('click'); // Updated selector for refresh button
    await flushPromises(); // Wait for the new fetch

    // Check if new messages are displayed
    const updatedMessageItems = wrapper.findAll('.message-item'); // Use the updated class
    expect(updatedMessageItems).toHaveLength(newMessages.length);
    expect(updatedMessageItems.at(0).find('.message-content').text()).toBe(newMessages[0].content); // Updated selector
  });
});
