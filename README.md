
# React APP for ByteGenine test project
### 1. How to run
- Install dependency packages 
    ### npm install
- Run server
    ### npm start

### 2. The UI tried to simulate ChatGPT page. Main components are: 
  - Questions & Answer's history
  - Text input box for query.
  - A button named 'Send' to get result.

### 3. Functions
  - Load Backend server address and port number from environment file. (.env.*)
  - User can tpye questions into textbox and press 'Send' button.
  - Or user can press 'Enter' key on the keyboard.
  - While fetching API response, loading gif animation is visible.
  - Shows error message if error occured while getting backend API.
  - Visualize query result in table format.
  - Scrolls down to the lates query.
### 3. The API endpoints the UI uses
#### /process(POST)
- Request
    ``` payload 
    {
        content: String
    }
- Response
    ``` payload 
    {
        columns: Array
        rows: Array
        eror: String
    }
#### /(GET)
This endpoint is just for checking backend server lifeness.
- Response
    ``` payload 
    {
        message: "Hello ByteGene!"
    }
### 4. Key challenges I faced in building the front-end


### 5. Things to improve the front-end
 - We can implement voice recognition module, so user just talk instead of typing.
 - Modify css styles. so it looks beautiful!