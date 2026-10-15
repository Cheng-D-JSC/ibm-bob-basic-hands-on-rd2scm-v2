# Frequently Asked Questions

## General

### What is Bob?

Bob is an AI-powered coding companion that can help you write code, refactor existing code, and complete various tasks. Bob's capabilities can be extended with custom modes and instructions.

### How does Bob work?

Bob uses large language models (LLMs) to understand your requests and translate them into actions. It can:

- Read and write files in your project.
- Run commands in your terminal.
- Browse the internet (if enabled).
- Use external tools via the Model Context Protocol (MCP).

You interact with Bob through a chat interface, where you provide instructions and review/approve its proposed actions.

### What can Bob do?

Bob can help with a variety of coding tasks, including:

- Generating code from natural language descriptions.
- Refactoring existing code.
- Fixing bugs.
- Writing documentation.
- Explaining code.
- Answering questions about your codebase.
- Automating repetitive tasks.
- Creating new files and projects.

### Are there any restrictions on processing certain data types with Bob?

The following data types should not be processed with Bob:

- SPI
- Personal Health Information (PHI)
- Export Regulated (ITAR, APP etc)
- Regulated Financial Data (Banking numbers, PANs, non-public financial data)

### What are the risks of using Bob?

Bob is a powerful tool, and it's important to use it responsibly. Remember:

- **Bob can make mistakes.** Always review Bob's proposed changes carefully before approving them.
- **Bob can execute commands.** Be cautious when asking Bob to run commands, especially if you're using auto-approval.

## Usage

### How do I start a new task?

Open the Bob panel and type your task in the chat box. Be clear and specific about what you want Bob to do.

### How do I switch between modes?

Use the dropdown menu in the chat input area to select a different mode, or use the `/` command to switch to a specific mode.

### What are tools and how do I use them?

Tools are how Bob interacts with your system. Bob automatically selects and uses the appropriate tools to complete your tasks. You don't need to call tools directly. You will be prompted to approve or reject each tool use.

### What are context mentions?

Context mentions are a way to provide Bob with specific information about your project, such as files, folders, or problems. Use the `@` symbol followed by the item you want to mention (e.g., `@/src/file.ts`, `@problems`).

### Can Bob run commands in my terminal?

Yes, Bob can run commands. You will be prompted to approve each command, unless you've enabled auto-approval for commands. Be extremely cautious auto-approving commands.

### How do I provide feedback to Bob?

You can provide feedback by approving or rejecting Bob's proposed actions. You can provide additional feedback by using the feedback field.

### Can I customize Bob's behavior?

Yes, you can customize Bob in several ways:

- **Custom instructions:** Provide general instructions that apply to all modes, or mode-specific instructions.
- **Custom modes:** Create your own modes with tailored prompts and some tool permissions.
- **Bob rules:** Create markdown rule files in your `.bob/rules/` folder in the root of project to provide additional guidelines.
- **Settings:** Adjust various settings, such as auto-approval, diff editing, and more.

### Does Bob have any auto approval settings?

Yes, Bob has a few settings that when enabled will automatically approve actions.

## Advanced Features

### What is MCP (Model Context Protocol)?

MCP is a protocol that allows Bob to communicate with external servers, extending its capabilities with custom tools and resources.

### Can I create my own MCP servers?

Yes, you can create your own MCP servers to add custom functionality to Bob.

## Troubleshooting

### Bob isn't responding. What should I do?

- Make sure your API key is correct and hasn't expired.
- Check your internet connection.
- Try restarting VS Code.

### Bob made changes I didn't want. How do I undo them?

Bob uses VS Code's built-in file editing capabilities. You can use the standard "Undo" command (Ctrl/Cmd + Z) to revert changes. You can also use checkpoints to revert changes made to a file.