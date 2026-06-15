// =====================
// HIA AI
// app.js
// =====================

// خپل API Key دلته ولیکه

const API_KEY = "sk-ws-H.IRHEPY.hSui.MEYCIQDiK2-tuF51VD1_O2uN6WudTu_AQK85sXR7Hqo6TVHzJgIhAKJ-3OhGD1TxKyXKjaMhSXSAT5hc629TbFfJul1MHimf";

// API URL

const API_URL =
"https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions";

// Model

const MODEL = "qwen-plus";

// =====================
// Copy Message
// =====================

function copyText(btn){

    let text =
    btn.parentElement.parentElement
    .querySelector(".msg")
    .innerText;

    navigator.clipboard.writeText(text);

    btn.innerHTML = "✅ Copied";

    setTimeout(()=>{

        btn.innerHTML="📋 Copy";

    },1500);

}

// =====================
// Type Writer
// =====================

async function typeWriter(element,text){

    element.innerHTML="";

    for(let i=0;i<text.length;i++){

        element.innerHTML += text.charAt(i);

        document
        .getElementById("chat")
        .scrollTop =
        document
        .getElementById("chat")
        .scrollHeight;

        // 4 چنده چټک

        await new Promise(
        r=>setTimeout(r,4)
        );

    }

}

// =====================
// Code Copy
// =====================

function createCodeCopy(){

    document
    .querySelectorAll("pre")
    .forEach(pre=>{

        if(
        pre.querySelector(".copy-code")
        ) return;

        let btn =
        document.createElement("button");

        btn.className =
        "copy-code";

        btn.innerHTML =
        "📋 Copy";

        btn.onclick=()=>{

            navigator
            .clipboard
            .writeText(
            pre.innerText
            );

            btn.innerHTML=
            "✅ Copied";

            setTimeout(()=>{

                btn.innerHTML=
                "📋 Copy";

            },1500);

        };

        pre.appendChild(btn);

    });

}

// =====================
// Send Message
// =====================

async function sendMessage(){

    let input =
    document
    .getElementById("message");

    let text =
    input.value.trim();

    if(text=="")
    return;

    let chat =
    document
    .getElementById("chat");

    // USER

    chat.innerHTML +=

    `

    <div class="user">

        <div class="msg">

        ${text}

        </div>

        <div class="message-tools">

        <button
        class="copy-message"
        onclick="copyText(this)">

        📋 Copy

        </button>

        </div>

    </div>

    `;

    input.value="";

    chat.scrollTop=
    chat.scrollHeight;

    // AI Loading

    chat.innerHTML +=

    `

    <div
    class="ai"
    id="loading">

    <div class="typing">

    <span></span>

    <span></span>

    <span></span>

    </div>

    </div>

    `;

    chat.scrollTop=
    chat.scrollHeight;

    try{

        let response =
        await fetch(
        API_URL,
        {

        method:"POST",

        headers:{

        "Content-Type":
        "application/json",

        "Authorization":
        "Bearer "+
        API_KEY

        },

        body:
        JSON.stringify({

        model:
        MODEL,

        messages:[

        {

        role:"system",

        content:
        "You are HIA AI. Reply in Pashto when possible. Format code properly."

        },

        {

        role:"user",

        content:
        text

        }

        ]

        })

        });

        let data =
        await response.json();

        document
        .getElementById(
        "loading"
        )
        .remove();

        let answer =
        data
        .choices[0]
        .message
        .content;

        // AI BOX

        let ai =
        document
        .createElement(
        "div"
        );

        ai.className =
        "ai";

        ai.innerHTML =

        `

        <div class="msg">

        </div>

        <div class="message-tools">

        <button
        class="copy-message"
        onclick="copyText(this)">

        📋 Copy

        </button>

        </div>

        `;

        chat.appendChild(ai);

        // Typing

        await typeWriter(

        ai.querySelector(
        ".msg"
        ),

        answer

        );

        // Markdown

        ai.querySelector(
        ".msg"
        )
        .innerHTML =

        marked.parse(
        answer
        );

        // Code Copy

        createCodeCopy();

        chat.scrollTop=
        chat.scrollHeight;

    }

    catch(e){

        document
        .getElementById(
        "loading"
        )
        .remove();

        chat.innerHTML +=

        `

        <div class="ai">

        <div class="msg">

        Error:

        ${e.message}

        </div>

        </div>

        `;

    }

}

// =====================
// ENTER SEND
// =====================

document
.getElementById(
"message"
)
.addEventListener(
"keypress",

function(e){

if(
e.key==="Enter"
){

sendMessage();

}

}

);

// =====================
// AUTO FOCUS
// =====================

document
.getElementById(
"message"
)
.focus(); 
