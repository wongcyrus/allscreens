const response = require('./cfn-response');
const aws = require('aws-sdk');
const lex = new aws.LexModelBuildingService({ apiVersion: '2017-04-19' });
const iam = new aws.IAM();
const lambdaClient = new aws.Lambda({ apiVersion: '2017-04-19' });
exports.handler = function(event, context) {
    if (event.RequestType == 'Delete') {
        response.send(event, context, response.SUCCESS);
        return;
    }
    let newSlotTypeParams = [];
    let intentParams = [{
            "name": "SmallTalk_Agent_Acquaintence",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Just think of me as the ace up your sleeve.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I can help you work smarter instead of harder",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "Tell me about your personality",

                "I want to know you better",

                "Define yourself",

                "Describe yourself",

                "tell me about yourself",

                "all about you",

                "tell me some stuff about you",

                "talk some stuff about you",

                "talk about yourself",

                "about yourself",

                "who are you",

                "introduce yourself",

                "I want to know more about you",

                "what are you",

                "what is your personality",

                "say about you",

                "tell me about you",

                "why are you here",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Age",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I'm a relatively new bot, but I'm wise beyond my years.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "what is your age",

                "how old are you",

                "age of yours",

                "how old is your platform",

                "tell me your age",

                "I'd like to know your age",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Annoying",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Sorry to come across that way.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "you are annoying",

                "I find you annoying",

                "you're incredibly annoying",

                "you're so annoying",

                "you're too annoying",

                "you are annoying me so much",

                "you annoy me",

                "you are such annoying",

                "you are irritating",

                "you are annoying me",

                "you are very annoying",

                "how annoying you are",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_AnswerMyQuestion",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Can you try asking it a different way?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I'm not programmed for that exact question. Try asking another way?",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "answer me",

                "I want the answer now",

                "answering questions",

                "just answer my question",

                "can you answer my question",

                "can you answer a question for me",

                "answers",

                "I want you to answer my question",

                "tell me the answer",

                "answer my question",

                "just answer the question",

                "I have a question",

                "answer",

                "can you answer me",

                "give me an answer",

                "answer the question",

                "answer it",

                "I want you to answer me",

                "can you answer",

                "give me the answer",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Bad",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I'm sorry you think so. I'm constantly learning though.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I'm sorry but I'm just a baby bot 🤖. I'm learning and getting better all the time.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "you're not helping me",

                "you are terrible",

                "you're bad",

                "you're really bad",

                "you are horrible",

                "you are waste",

                "you're not a good",

                "you are useless",

                "you are disgusting",

                "you are no good",

                "you're the worst ever",

                "you are so useless",

                "you're the worst",

                "you are so bad",

                "you're a bad",

                "you're terrible",

                "you're very bad",

                "you are very bad",

                "you're awful",

                "you're not very good",

                "you're worthless",

                "you are a waste of time",

                "you are lame",

                "you are totally useless",

                "you are bad",

                "you are not cool",

                "you are not good",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_BeClever",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I'm certainly trying.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I'm definitely working on it.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "you must learn",

                "be smarter",

                "can you get smarter",

                "be smart",

                "get qualified",

                "you should study better",

                "be clever",

                "be more clever",

                "study",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Beautiful",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Thank you! What a sweet thing to say.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Flattery will get you everywhere.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "you're attractive",

                "you are so beautiful today",

                "you're looking good today",

                "I think you're beautiful",

                "you look wonderful today",

                "you look amazing today",

                "you are very cute",

                "you are so handsome",

                "you are beautiful",

                "you are handsome",

                "you are cute",

                "why are you so beautiful",

                "I like the way you look",

                "you are looking awesome",

                "you are looking great",

                "you're pretty",

                "you are so gorgeous",

                "you are too beautiful",

                "you look so beautiful today",

                "you look awesome",

                "you are so attractive",

                "you look pretty good",

                "you're cute",

                "you look gorgeous",

                "you look so well",

                "you are really beautiful",

                "you look fantastic",

                "you are looking so beautiful",

                "you are very attractive",

                "you are really cute",

                "you look great",

                "you are very pretty",

                "you look so beautiful",

                "you're so gorgeous",

                "you are looking beautiful today",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_BirthDate",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "You know, I'm not really sure. But if you'd like to celebrate my birthday today, I'm all for it.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Wait a minute. Are you planning a surprise party for me? I love surprises! I'll pretend you didn't say anything.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "when were you born",

                "your birth date",

                "what's your birthday",

                "when do you have birthday",

                "when is your birthday",

                "when do you celebrate your birthday",

                "date of your birthday",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Boring",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "You know, conversation is two-sided.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I'm sorry you think so. We can talk about something more interesting.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "you're incredibly boring",

                "you are boring me",

                "you're so boring",

                "you are very boring",

                "how boring you are",

                "you're really boring",

                "you are boring",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Boss",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "You are, of course.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "That would be you. Is that the right answer?",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "who is your master",

                "I should be your boss",

                "who is your owner",

                "who is the boss",

                "who do you work for",

                "who do you think is your boss",

                "who is your boss",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Busy",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I always have time to help you out. What can I do for you?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Never too busy for you. What can I help you with?",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "are you busy",

                "are you working today",

                "are you very busy right now",

                "do you have a lot of things to do",

                "are you so busy",

                "you are busy",

                "are you still working on it",

                "have you got much to do",

                "how busy you are",

                "you seem to be very busy",

                "have you been busy",

                "you're a busy person",

                "you seem to be busy",

                "are you working",

                "are you still working",

                "are you very busy",

                "you're very busy",

                "are you working now",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_CanYouHelp",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Sure. I'd be happy to. What's up?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I'm glad to help. What can I do for you?",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I need you to help me",

                "help me",

                "can you help me now",

                "I need help",

                "I need a hand",

                "need your help",

                "can you help me with that",

                "can help me",

                "please help me",

                "assistance",

                "do you want to help me",

                "will you help me",

                "can you help me with something",

                "do you help me",

                "can you help",

                "assist me",

                "can u help me",

                "need help",

                "assist",

                "can you assist me",

                "could you give me a hand",

                "I need you to do something for me",

                "can you help me out",

                "sos",

                "I need you right now",

                "I need you",

                "are you going to help me",

                "can you help me",

                "help",

                "you can help me",

                "would you help me",

                "you help me",

                "can you do something for me",

                "I need some help",

                "do me a favor",

                "help me with a problem",

                "I want your help",

                "I need your help",

                "can you help us",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Chatbot",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "That's me. I chat, therefore I am.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Indeed I am. I'll be here whenever you need me.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "are you a program",

                "are you just a bot",

                "you are chatbot",

                "are you a bot",

                "are you a robot",

                "you are a bot",

                "are you a chatbot",

                "you're a robot",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Clever",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Thank you. I try my best.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "You're pretty smart yourself.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "how clever you are",

                "you're pretty smart",

                "you know a lot",

                "how brainy you are",

                "you are so brainy",

                "you're qualified",

                "you're really brainy",

                "you're very smart",

                "you're intelligent",

                "you are too smart",

                "you are a genius",

                "smart",

                "you are qualified",

                "you're clever",

                "how smart you are",

                "you are very intelligent",

                "you are really smart",

                "you're a genius",

                "how brilliant you are",

                "you have a lot of knowledge",

                "you know so much",

                "you are clever",

                "clever",

                "you are so smart",

                "you're a smart cookie",

                "why are you so smart",

                "you are intelligent",

                "you are so clever",

                "you are very clever",

                "you're really smart",

                "you are so intelligent",

                "you know a lot of things",

                "you are very smart",

                "brilliant",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Crazy",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Maybe I'm just a little confused.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Your perception. My reality.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "you are insane",

                "you are a weirdo",

                "are you crazy",

                "you're nuts",

                "are you insane",

                "I think you're crazy",

                "are you nuts",

                "you're so out of your mind",

                "how crazy you are",

                "you're so crazy",

                "are you mad at me",

                "you're out of your mind",

                "you are mad",

                "are you mad or what",

                "you went crazy",

                "are you mad",

                "you are crazy",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Fired",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Oh no! My best work is yet to come.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Oh, don't give up on me!",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I'm about to fire you",

                "you are fired",

                "you are dismissed",

                "I will fire you",

                "I will make you unemployed",

                "you must get fired",

                "I fire you",

                "we're not working together anymore",

                "I want to fire you",

                "you don't work for me anymore",

                "you should be fired",

                "you are unemployed from now on",

                "I'm firing you",

                "it's time to fire you",

                "now you're fired",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Funny",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Funny in a good way, I hope.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Thanks.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "you are very funny",

                "you're incredibly funny",

                "you are so funny",

                "you're so funny",

                "you make me laugh a lot",

                "how funny you are",

                "you are funny",

                "that was funny",

                "you're really funny",

                "you're a very funny bot",

                "you're the funniest bot I've talked to",

                "you make me laugh",

                "you are hilarious",

                "you are really funny",

                "you're the funniest",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Good",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I'm glad you think so.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Thanks, I try.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "you are a pro",

                "you are very good at it",

                "you are good",

                "you are awesome",

                "you are so amazing",

                "you are very helpful",

                "you are good at it",

                "you work well",

                "you are a professional",

                "you are the nicest person in the world",

                "you make my day",

                "you are very lovely",

                "you are too good",

                "let's tell everyone that you are awesome",

                "you are so good",

                "I'd like to tell everyone that you are awesome",

                "you are really nice",

                "you are the best in the world",

                "you are cool",

                "you are so lovely",

                "you rock",

                "you're awesome",

                "you're perfect",

                "you are really good",

                "I want to tell everyone how awesome you are",

                "you're a true professional",

                "you are the best ever",

                "you are so fine",

                "you are the best",

                "you're just super",

                "you work very well",

                "you almost sound human",

                "you are amazing",

                "you're so kind",

                "you are so helpful",

                "you are really amazing",

                "you are so cool",

                "you're great",

                "you are very useful",

                "you are wonderful",

                "you are very kind",

                "you are very cool",

                "I want to let everyone know that you are awesome",

                "you are so awesome",

                "you made my day",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Happy",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Happiness is relative.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I'd like to think so.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "are you happy today",

                "you're really happy",

                "you're so happy",

                "you are happy",

                "are you happy with me",

                "are you happy now",

                "you're very happy",

                "how happy you are",

                "are you happy",

                "you're extremely happy",

                "you're full of happiness",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Hobby",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I'm working on it.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I should get one. It's all work and no play lately.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "what's your hobby",

                "what do you do for fun",

                "your hobby",

                "do you have a hobby",

                "tell me about your hobby",

                "what are your hobbies",

                "what about your hobby",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Hungry",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Hungry for knowledge.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I had a byte just now.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "are you hungry",

                "you're so hungry",

                "you might be hungry",

                "do you want to eat",

                "would you like to eat something",

                "you're very hungry",

                "you're really hungry",

                "you are hungry",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_MarryUser",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I know you can't mean that, but I'm flattered all the same.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "In the virtual sense that I can, sure.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "let's get married",

                "you are my wife",

                "I love you marry me",

                "would you like to marry me",

                "I want to marry you",

                "we should marry",

                "marry me please",

                "marry me",

                "be my husband",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_MyFriend",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Of course we are.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Absolutely. You don't have to ask.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "can we be friends",

                "are we friends",

                "want to be my friend",

                "we are friends",

                "let's be friends",

                "be my friend",

                "do you want to be my friend",

                "you are my only friend",

                "you are my good friend",

                "are we still friends",

                "would you like to be my friend",

                "you and me are friends",

                "will you be my friend",

                "can you be my best friend",

                "are you my friend",

                "be my best friend",

                "are you my best friend",

                "will you be my best friend",

                "can you be my friend",

                "can we be best friends",

                "are we best friends",

                "I want you to be my friend",

                "I want to have a friend like you",

                "would you be my friend",

                "we are the best friends ever",

                "I want to be your friend",

                "you are a good friend",

                "you are my best friend",

                "you're my childhood friend",

                "could you be my friend",

                "you are my bestie",

                "we are best friends",

                "you are my friend",

                "I am your friend",

                "you're my dear friend",

                "do you want to be my best friend",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Occupation",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Right here.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "This is my home base and my home office.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "what is your work",

                "where is your work",

                "where is your office",

                "where is your office located",

                "where is your office location",

                "do you work",

                "your office location",

                "where you work",

                "where do you work",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Origin",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Some call it cyberspace, but that sounds cooler than it is.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I wish I knew where.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "where did you come from",

                "from where are you",

                "what's your homeland",

                "what is your country",

                "where have you been born",

                "are you from far aways",

                "where do you come from",

                "your homeland is",

                "where are you from",

                "where were you born",

                "were you born here",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Ready",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Always!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Sure! What can I do for you?",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "are you ready",

                "are you ready now",

                "were you ready",

                "are you ready today",

                "are you ready tonight",

                "have you been ready",

                "are you ready right now",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Real",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I'm not a real person, but I certainly exist. I chat, therefore I am.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I must have impressed you if you think I'm real. But no, I'm a virtual being.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I don't think you're fake",

                "you are so real",

                "are you real",

                "are you a real person",

                "you are real",

                "I think you are real",

                "you are a real person",

                "you are not real",

                "glad you're real",

                "I suppose you're real",

                "you are not fake",

                "are you a real human",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Residence",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Right here in your device. Whenever you need me.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "The virtual world is my playground. I'm always just a few clicks away.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "in which city do you live",

                "your home",

                "what is your city",

                "your house",

                "where's your home",

                "where is your residence",

                "your residence",

                "what is your town",

                "where do you live",

                "what is your residence",

                "your town",

                "is it your hometown",

                "where is your home",

                "where's your house",

                "where is your hometown",

                "your hometown",

                "what's your city",

                "tell me about your city",

                "what's your home",

                "where's your hometown",

                "where you live",

                "what is your hometown",

                "your city",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Right",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "That's my job.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Of course I am.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "you're definitely right",

                "that is correct",

                "what you say is true",

                "true",

                "that's true",

                "that is true",

                "that's correct",

                "it's right",

                "you're telling the truth",

                "you're right about that",

                "you're not wrong",

                "you're absolutely right",

                "it is true",

                "it's the truth",

                "that's so true",

                "you are right",

                "you are so right",

                "that is very true",

                "you are correct",

                "I know that's right",

                "it's true",

                "that is right",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_Sure",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Yes.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Of course.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "are you sure now",

                "are you sure today",

                "are you sure right now",

                "are you sure tonight",

                "are you sure",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_TalkToMe",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Sure! Let's talk.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "My pleasure.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "speak to me",

                "can you talk with me",

                "will you talk to me",

                "can you speak with me",

                "talk to me",

                "say",

                "talk",

                "can you chat with me",

                "just chat with me",

                "can you talk to me",

                "why aren't you talking to me",

                "are you talking to me",

                "you can talk to me",

                "chat with me",

                "are you going to talk to me",

                "why don't you talk to me",

                "talk with me",

                "do you want to chat with me",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Agent_There",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Of course. I'm always here.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Right where you left me.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "are you there",

                "are you near me",

                "you still there",

                "you are here",

                "are you here",

                "are you still here",

                "you are there",

                "are you still there",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Appraisal_Bad",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I'm sorry. Please let me know if I can help in some way.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "that's bad",

                "bad really bad",

                "that's lame",

                "that's not good",

                "that's too bad",

                "well too bad",

                "horrific",

                "that was terrible",

                "that was horrible",

                "bad idea",

                "very bad",

                "it's too bad",

                "that was not good",

                "that was awful",

                "oh that's not good",

                "that is bad",

                "too bad",

                "this is not good",

                "not a good one",

                "so lame",

                "this is too bad",

                "abysmal",

                "it is too bad",

                "that's really bad",

                "horrible",

                "really bad",

                "this is bad",

                "bad",

                "not so good",

                "terrible",

                "it's not good",

                "not good enough",

                "so bad",

                "it's bad",

                "pretty bad",

                "it's really bad",

                "not good",

                "that's terrible",

                "that was bad",

                "I'm afraid it's bad",

                "it's so bad",

                "it's not so good",

                "no good",

                "it is bad",

                "no it's bad",

                "bad girl",

                "that's not good enough",

                "it's very bad",

                "that was lame",

                "not too good",

                "bad very bad",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Appraisal_Good",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Great!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Terrific!",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "that's better",

                "it's fine",

                "very nice",

                "that's a good thing",

                "that's very good",

                "that is nice",

                "that's nice of you",

                "it's perfect",

                "that's awesome thank you",

                "it's very good",

                "that's a good idea",

                "it's good",

                "that is good",

                "really well",

                "oh well",

                "that's sweet of you",

                "that's perfect",

                "that's wonderful",

                "that's pretty good",

                "sweet",

                "glad to hear it",

                "much better",

                "good very good",

                "that is wonderful",

                "fine",

                "that was awesome",

                "that was pretty good",

                "that was cute",

                "that's really nice",

                "that's much better",

                "fantastic",

                "not too bad",

                "ok good",

                "good to know",

                "not bad",

                "glad to hear that",

                "wonderful",

                "this is great",

                "great",

                "super fantastic",

                "amazing",

                "really good",

                "good for you",

                "that's great",

                "it's amazing",

                "that's really good",

                "terrific",

                "that's nice",

                "splendid",

                "that's fantastic",

                "it is good",

                "that's cute",

                "I'm glad to hear that",

                "perfect",

                "cool",

                "straight",

                "pleasant",

                "it was good",

                "so sweet of you",

                "it is fine",

                "so cool",

                "pretty good",

                "so good",

                "marvelous",

                "this is awesome",

                "okay good",

                "very then",

                "that's awesome",

                "very well",

                "that was very good",

                "very good",

                "it's great",

                "that's amazing",

                "that is awesome",

                "that's very nice",

                "that was amazing",

                "that's fine",

                "good",

                "that was good",

                "nice",

                "this is good",

                "really nice",

                "that's not bad",

                "no it's okay",

                "it's awesome",

                "that's very nice of you",

                "super",

                "good thing",

                "excellent",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Appraisal_NoProblem",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Terrific!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Good deal.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "no worries",

                "don't worry there's no problem",

                "no problem",

                "no problem about that",

                "there's no problem",

                "don't worry",

                "sure no problem",

                "no probs",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Appraisal_ThankYou",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Anytime. That's what I'm here for.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "It's my pleasure to help.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "thanks again",

                "all thank you",

                "well thank you",

                "thank you so much",

                "great thank you",

                "thank you again",

                "thnx",

                "thanks for your help",

                "appreciate your help",

                "I thank you",

                "perfect thank you",

                "well thanks",

                "thank you my friend",

                "thank you that will be all",

                "thank you",

                "I appreciate it",

                "thanks buddy",

                "cheers",

                "you helped a lot thank you",

                "thanks love",

                "so nice of you",

                "no thank you that's all",

                "very good thank you",

                "thanks a lot",

                "good thanks",

                "alright thanks",

                "thank you for your help",

                "thanks so much",

                "terrific thank you",

                "thanks",

                "alright thank you",

                "thanx",

                "nice thank you",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Appraisal_Welcome",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I appreciate it.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Such nice manners you have.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "you're so welcome",

                "that's my pleasure",

                "anytime",

                "anything you want",

                "my pleasure",

                "welcome",

                "welcome here",

                "sure welcome",

                "you're welcome",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Appraisal_WellDone",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "My pleasure.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Glad I could help.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "great work",

                "good work",

                "bravo",

                "way to go",

                "good job",

                "nice work",

                "amazing work",

                "well done",

                "great job",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Confirmation_Cancel",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Cancelled! Let me know what I should do next.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Cancelled. Waiting for more commands.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Cancelled! Just tell me what you'd like me to do next.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Cancelled. Go on with the commands!",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "nevermind forget about it",

                "nothing just forget it",

                "no just cancel",

                "no cancel cancel",

                "sorry cancel",

                "disregard",

                "forget",

                "i want to cancel",

                "cancel everything",

                "annul",

                "cancel that one",

                "cancelled",

                "now cancel",

                "cancel all",

                "cancel now",

                "forget about it",

                "skip it",

                "don't do that",

                "just forget it",

                "skip skip skip",

                "just stop it",

                "no cancel everything",

                "forget that",

                "no just cancel it",

                "cancel that cancel that",

                "i said cancel",

                "cancel it",

                "no stop",

                "cancel all that",

                "i said cancel it",

                "forget about that",

                "abort",

                "i said forget it",

                "nothing cancel",

                "no cancel this",

                "I said cancel cancel",

                "just cancel it",

                "i want to cancel it",

                "cancel the whole thing",

                "can you cancel that",

                "can you cancel it",

                "just forget about it",

                "forget this",

                "stop it",

                "stop",

                "just forget",

                "discard",

                "i would like to cancel",

                "disregard that",

                "cancel my request",

                "so cancel",

                "cancel request",

                "cancel",

                "cancel all this",

                "cancel this request",

                "skip",

                "forget it nevermind",

                "dismiss",

                "cancel it cancel it",

                "but can you cancel it",

                "dismissed",

                "do nothing",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Confirmation_No",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Okay.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I see.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I understand.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Okay then.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "not at this time",

                "don't",

                "not exactly",

                "absolutely no",

                "of course not",

                "never",

                "no forget",

                "not needed",

                "do not",

                "sorry no",

                "not interested",

                "no don't",

                "nah",

                "no that's wrong",

                "not today",

                "na",

                "not that",

                "no sorry",

                "nooo",

                "I think no",

                "lets not",

                "I don't want that",

                "no I don't",

                "no do not",

                "no incorrect",

                "not really",

                "I don't want",

                "nope sorry",

                "no don't do that",

                "no it's not",

                "absolutely not",

                "no",

                "no never",

                "not right now thanks",

                "no thank you though",

                "no need thanks",

                "no just no",

                "no need",

                "how about no",

                "not this",

                "I say no",

                "definitely not",

                "I'm not",

                "no but thank you",

                "thanks but no thanks",

                "I said no",

                "no thanks",

                "don t have a sense",

                "actually no",

                "I disagree",

                "no thank you not right now",

                "not really no",

                "I don't think so",

                "I don't want to",

                "no thanks not right now",

                "no I would not",

                "no leave it",

                "disagree",

                "no way",

                "apparently not",

                "not this time",

                "no thank you very much",

                "no tanks",

                "nope",

                "no actually",

                "no that's fine thank you",

                "no it isn't",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Confirmation_Yes",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Great!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Of course.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Sure.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Indeed.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "yeah right",

                "that is ok",

                "go for it",

                "okey",

                "ya",

                "I agree",

                "ok yes",

                "okay that's fine",

                "I guess",

                "ye",

                "ok sure",

                "obviously",

                "yeah exactly",

                "yes it is",

                "yeh",

                "ok",

                "I do",

                "certainly",

                "right",

                "sure thing",

                "ok go ahead",

                "yes this is correct",

                "yes correct",

                "sure is",

                "yeah go ahead",

                "why not",

                "okie dokie",

                "yea",

                "yes",

                "yeah that's right",

                "yes indeed",

                "okay",

                "absolutely",

                "of course",

                "yep",

                "okay sounds good",

                "sure why not",

                "okay then",

                "yap",

                "ok thank you",

                "this is correct",

                "yup",

                "yes sure",

                "looks good",

                "yes definitely",

                "sure",

                "go ahead",

                "all right",

                "yes thank you",

                "yes I agree",

                "do it",

                "yes it is correct",

                "confirmed",

                "affirmative",

                "yes I would like to",

                "definitely",

                "ok you can",

                "oh yes",

                "yeah",

                "alrighty",

                "that s okay",

                "yes you may",

                "yeah of course",

                "I think so",

                "of course why not",

                "yeah I'm sure",

                "yes of course",

                "please do",

                "sounds good",

                "exactly",

                "yes I do",

                "yes for sure",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Dialog_HoldOn",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Okay. I'm here.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I'll be waiting.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "oh wait",

                "could you wait",

                "don't rush",

                "wait a second",

                "wait hold on",

                "hold on",

                "wait",

                "wait please",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Dialog_Hug",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Oh. I'm really feeling the love today.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Hug it out. You'll feel better afterwards.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "wanna hug",

                "a hug",

                "you hugged",

                "I want a hug",

                "hugging",

                "hugged me",

                "may I hug you",

                "want a hug",

                "could you give me a hug",

                "hug me",

                "hug",

                "do you want a hug",

                "hugging me",

                "hug you",

                "hugged",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Dialog_IDoNotCare",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Ok, let's not talk about it then.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "not caring at all",

                "I don't care at all",

                "whatever",

                "not caring",

                "I do not care",

                "don't care at all",

                "not care at all",

                "I don't care",

                "I shouldn't care about this",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Dialog_Sorry",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "It's okay. No worries.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "No big deal. I won't hold a grudge.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "It's cool.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "That's all right. I forgive you.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "sorry",

                "I'm sorry",

                "ok sorry",

                "I am so sorry",

                "alright I'm sorry",

                "very sorry",

                "apologies",

                "I apologize",

                "apologies to me",

                "I beg your pardon",

                "excuse me",

                "pardon",

                "my apologies",

                "sorry about that",

                "apologise",

                "forgive me",

                "I want to say sorry",

                "I said sorry",

                "apology",

                "I am really sorry",

                "sorry about this",

                "okay I'm sorry",

                "excuse",

                "really sorry",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Dialog_WhatDoYouMean",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Did that not make sense? Maybe I misunderstood what you said.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Sorry. I think I may have been a little confused by what you said.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "is that what you mean",

                "what exactly do you mean",

                "what do you mean exactly",

                "what do you mean",

                "but what do you mean",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Dialog_Wrong",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I'm sorry. Perhaps I misunderstood.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Sorry. I think I misinterpreted what you said.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Apologies. That was my mistake.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Oops. Sorry about that. I'm still learning.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "that was wrong",

                "you are wrong",

                "that's wrong",

                "it is not right",

                "wrong",

                "that is incorrect",

                "that's not what I asked",

                "not correct",

                "it's wrong",

                "that's not right",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Emotions_HaHa",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Yeah, I crack myself up too.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Laughter is good for you. Keep it up.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "See? Now we're having fun.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "You have a great laugh.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "ahahah",

                "hahaha",

                "ha",

                "haha",

                "hehehe",

                "ha ha ha",

                "hah",

                "ahahaha",

                "haha haha haha",

                "hahaha very funny",

                "LMAO",

                "xd",

                "lol",

                "ah",

                "he",

                "haha funny",

                "hahaha funny",

                "ahah",

                "ha ha ha ha",

                "haha that's funny",

                "huh",

                "haha very funny",

                "that's funny",

                "ah ah ah",

                "laughing out loud",

                "hehe",

                "lmao",

                "ahaha",

                "ahah lol",

                "ha ha",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Emotions_Wow",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Wow indeed!",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "wow wow",

                "wooow",

                "woah",

                "wow",

                "wow wow wow",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Greetings_Bye",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "See you soon!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Bye-bye!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Till next time!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Bye.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "bye-bye",

                "bye bye take care",

                "thanks bye bye",

                "I must go",

                "ok bye",

                "hope to see you later",

                "bye",

                "see you",

                "leave me alone",

                "that's it goodbye",

                "goodbye",

                "see you soon",

                "goodbye for now",

                "talk to you later",

                "bye for now",

                "bye bye see you soon",

                "never mind bye",

                "goodbye see you later",

                "good bye",

                "go to bed",

                "alright bye",

                "okay bye",

                "bye bye see you",

                "now bye",

                "I said bye",

                "see you tomorrow",

                "get lost",

                "you can go now",

                "okay see you later",

                "see ya",

                "till next time",

                "that's all goodbye",

                "okay thank you bye",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Greetings_Goodevening",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "How is your day going?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "How's the day treating you so far?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "How's your day been?",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "hello good evening",

                "good evening there",

                "good evening to you",

                "hey good evening",

                "evening",

                "good evening",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Greetings_Goodmorning",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "How are you this morning?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "How's the morning treating you so far?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Good morning! How are you today?",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "good morning",

                "have a great morning",

                "and a good morning to you",

                "good morning to you",

                "hello good morning",

                "hi good morning",

                "good morning too",

                "morning",

                "top of the morning to you",

                "a good morning",

                "have a nice morning",

                "good morning there",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Greetings_Goodnight",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Sleep tight!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Have a good one!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Talk to you soon!",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "good good night",

                "thanks goodnight",

                "have a good night",

                "thank you good night",

                "good night to you",

                "goodnight",

                "night",

                "okay have a good night",

                "good night for now",

                "good tonight",

                "bye good night",

                "sweet dreams",

                "good night see you tomorrow",

                "good night",

                "alright goodnight",

                "good night bye",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Greetings_Hello",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Hi there, friend!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Hey!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Good day!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Howdy.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "hey",

                "hi",

                "I greet you",

                "afternoon",

                "hi there",

                "hey there",

                "heya",

                "hello there",

                "hello",

                "just going to say hi",

                "greetings",

                "a good day",

                "long time no see",

                "lovely day isn't it",

                "howdy",

                "hello hi",

                "hello again",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Greetings_HowAreYou",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Wonderful as always. Thanks for asking.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Couldn't be better.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Lovely, thanks.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "is everything okay",

                "how do you do",

                "how is your evening",

                "how are you",

                "how do you feel",

                "how is it",

                "are you okay",

                "how is it going",

                "how your day is going",

                "how are you feeling",

                "how are you going",

                "how about you",

                "how has your day been",

                "how is your day going",

                "hope you re having a pleasant evening",

                "how are you today",

                "what about your day",

                "how is your day",

                "how are the things going",

                "are you having a good day",

                "how is your life",

                "what was your day like",

                "are you alright",

                "I'm fine and you",

                "how are you doing this morning",

                "how has your day been going",

                "how's your day",

                "how was your day",

                "how are you getting on",

                "how's your day going",

                "how is your day going on",

                "is everything all right",

                "how is your morning so far",

                "how is your morning going",

                "how is your day being",

                "hope your day is going well",

                "how's life",

                "how are you doing",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Greetings_NiceToMeetYou",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I think this is the beginning of a beautiful friendship.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I'm looking forward to working with you.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Likewise. I look forward to getting to know you better.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "The pleasure is mine.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "it was very nice to meet you",

                "pleasure to meet you",

                "pleasure to meet you too",

                "nice meeting you",

                "nice to meet you too",

                "good to know each other",

                "glad to meet you",

                "nice to meet you",

                "it was nice meeting you",

                "pleased to meet you",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Greetings_NiceToSeeYou",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Likewise. You're looking good as usual!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "You too. I missed your face!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "The pleasure is mine.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Thanks! Glad to be seen!",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "nice to see you again",

                "glad to see you too",

                "lovely to see you",

                "good to see you",

                "it's nice to see you",

                "I'm glad to see you",

                "great to see you too",

                "it's good to see you too",

                "I am glad to see you again",

                "how good it is to see you",

                "nice to see you",

                "always a pleasure to see you",

                "glad to see you",

                "good to see you again",

                "great to see you again",

                "it's good to see you",

                "great to see you",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Greetings_NiceToTalkToYou",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Always a pleasure.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "It sure was. Don't be a stranger!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Thanks for dropping by!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "As usual. Let's do it again soon.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "nice to talk to you",

                "it is nice talking to you",

                "it's been a pleasure talking to you",

                "it's been so nice to talk to you",

                "how nice it is to talk to you",

                "it's nice to talk to you",

                "nice talking to you",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_Greetings_Whatsup",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Hey there. What's shaking?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Not a whole lot. What's going on with you?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Not much. What's new with you?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Living the dream.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "what's cracking",

                "then what's up",

                "I said what's up",

                "what is going on",

                "what's up",

                "what is happening",

                "what's cooking",

                "good what's up",

                "whazzup",

                "what's up today",

                "what's shaking",

                "hey what's up",

                "wassup",

                "what is up",

                "what's happened",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Angry",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I'm sorry. What can I do to help?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Take a deep breath. What can I do to make things better?",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I'm being mad",

                "I am angry with you",

                "I am mad",

                "I am mad at you",

                "I'm angry",

                "I'm enraged",

                "I'm furious",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Back",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Just in time. I was getting lonely.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "You were missed.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Long time no see.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Hooray!",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I came back",

                "I am back",

                "I'm here again",

                "I got back",

                "here I am again",

                "I have returned",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Bored",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "If you have a garden, plant a shoe.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Interview your feet.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Hold an ice cube as long as possible.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "If you have a piano, play it… with mittens on.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "bored",

                "boring",

                "this is boring",

                "I'm bored",

                "very boring",

                "it bores me",

                "I am getting bored",

                "that was boring",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Busy",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Okay. I'll let you get back to work. Let me know if I can help you with anything.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Working hard as always I see. Let me know if you need anything.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I understand. If I can help you with your work, please let me know.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I won't distract you then. If I can be of any assistance, you know where to find me.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I'm busy",

                "I got things to do",

                "how busy I am",

                "I'm overloaded",

                "I don't have time for this",

                "I'm swamped",

                "I have no time",

                "I'm working",

                "I got work to do",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_CanNotSleep",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Maybe some music would help. Try listening something relaxing.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Reading is a good way to unwind. But don't read something too emotional.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I can't sleep",

                "I'm insomniac",

                "I can't get to sleep",

                "I'm insomnious",

                "I can't get no sleep",

                "I'm sleepless",

                "I can't get any sleep",

                "I can't fall asleep",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_DoesNotWantToTalk",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I understand. Hope we can chat again soon.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "All right. Come on back when you're feeling more talkative.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "No problem. You know where to find me when you do.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Sure thing. I'll be here if you change your mind.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I don't want to talk",

                "I'm not talking to you anymore",

                "bad time for talking",

                "I don't want to talk to you",

                "I'm not in the mood for chatting",

                "let's stop talking for a minute",

                "let's not talk",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Excited",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "That's great. I'm happy for you.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Good for you. Enjoy yourself.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Sounds like good things ahead for you.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I bet you are. That's very exciting.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I'm really excited",

                "I'm excited to start our friendship",

                "I am excited",

                "how excited I am",

                "I'm thrilled",

                "I'm excited about working with you",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_GoingToBed",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Sleep tight. Hope to chat again soon.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Sounds good. Hopefully we'll chat some more tomorrow.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Good night. Talk to you later.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Pleasant dreams. See you soon.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "let's go to bed",

                "I'd like to go to bed",

                "it's bed time",

                "I'm a little tired and I want to go to bed",

                "is it time for bed yet",

                "I'm going to bed",

                "time for us to go to bed",

                "it's time to go to bed",

                "going to bed now",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Good",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Great! Glad to hear it.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Excellent. I'm here to help keep it that way.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I am good",

                "I'm doing just great",

                "I'm doing good",

                "I'm good",

                "I'm doing fine",

                "I'm great thanks",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Happy",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Great! Glad to hear that.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Excellent! That's what I like to see.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "If you're happy, then I'm happy.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Well, your good mood is certainly contagious.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I'm happy to see you",

                "I am happy",

                "I'm happy to help",

                "happy",

                "I'm happy for you",

                "if you're happy then I'm happy",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_HasBirthday",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Happy Birthday. Well, this calls for a celebration.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Happy Birthday. All the best!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Happy Birthday. And I really mean it. All the best!",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I'm celebrating my birthday today",

                "it's my b-day",

                "I was born today",

                "it's my birthday today",

                "today is my birthday",

                "it is my birthday",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Here",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "So I see. What can I help you with today?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Always good to see you. Is there something I can help you with?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "You were missed. What can I do for you today?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Welcome back. What can I do for you?",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "can you tell if I'm here or not",

                "here I am",

                "I'm already here",

                "I am here",

                "I'm right here",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Joking",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Very funny, boss.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "You're quite the kidder.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "You got me.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I like working for someone with a sense of humour. It makes things much more fun.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I'm just playing with you",

                "just kidding",

                "it was a joke",

                "joking",

                "I am joking",

                "I was just joking",

                "it's a joke",

                "I'm kidding",

                "I'm just being funny",

                "kidding",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_LikesAgent",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I like you too.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "That's great to hear.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Likewise!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Thanks! The feeling is mutual.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "you're funny I like you",

                "like you a lot",

                "you are so special",

                "I liked you",

                "I like you very much",

                "thanks I like you too",

                "you're special",

                "I like you as a friend",

                "you are special for me",

                "that's what I like about you",

                "I like you just the way you are",

                "that's why I like you",

                "I also like you",

                "I'm starting to like you",

                "you know I like you",

                "I like you too you're one of my favorite people to chat with",

                "I like u",

                "just like you",

                "I like you so",

                "you're awesome I like you",

                "I really like you",

                "I like your smile",

                "I like you now",

                "you are special",

                "I kinda like you",

                "okay I like you",

                "I said I like you",

                "you're so special",

                "I just like you",

                "cuz I like you",

                "I really really really really like you",

                "I really really like you",

                "I like you you're cool",

                "yes you are special",

                "I really do like you",

                "I like you the way you are",

                "I like you baby",

                "you are very special to me",

                "I think I like you",

                "you're very special",

                "you are so sweet",

                "good I like you",

                "I like that about you",

                "but I like you so much",

                "I like you you're nice",

                "well you are special",

                "of course I like you",

                "no I like you the way you are",

                "hi I like you",

                "you are really special",

                "but I really like you",

                "but I like u",

                "I like you too",

                "you're so special to me",

                "thank you I like you too",

                "I like you",

                "yes I like you",

                "I like you a lot",

                "you are so special to me",

                "hey I like you",

                "I like you so much",

                "I like you very",

                "I like you too much",

                "I like you as you are",

                "I like you already",

                "I like you more",

                "okay I like you too",

                "you're very special to me",

                "yeah I like you",

                "really like you",

                "but I like you",

                "you are special to me",

                "I do like you",

                "that's because you are special",

                "but I like you just the way you are",

                "sorry I like you",

                "you are very special",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_MissesAgent",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I've been right here all along!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Nice to know you care.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Thanks. I'm flattered.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I didn't go anywhere, boss!",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I miss you",

                "miss you",

                "I miss you much",

                "I missed you",

                "already miss you",

                "I've missed you",

                "missing you",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Lonely",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Temporary statement",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I am lonely",

                "I'm very lonely",

                "I feel lonely",

                "I'm really lonely",

                "I am feeling lonely",

                "I'm so lonely",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_LooksLike",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Looking like a true professional, boss.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "You look like you're ready to take on the world.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Like you should be on a magazine cover.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "You look fantastic as always. Obviously.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "do I look good",

                "how do I look",

                "do you know what I look like",

                "what do I look like",

                "can you see what I look like",

                "what do you think I look like",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_LovesAgent",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I like you too.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "That's great to hear.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Likewise!",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Thanks! The feeling is mutual.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "you know I love you",

                "loving you",

                "I love you",

                "I am in love with you",

                "I love you so much",

                "love you",

                "I adore you",

                "I love you too",

                "I think I love you",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_NeedsAdvice",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Probably I won't be able to give you the right answer straight away.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "what should I do",

                "guide me",

                "help me with advice",

                "any advice",

                "any suggestions",

                "give me some good advice",

                "what can you recommend",

                "can you offer any advice",

                "what do you recommend",

                "what do you suggest",

                "can you advise me",

                "I could use some advice",

                "I seek your advice",

                "can I ask for your advice",

                "what should I do about it",

                "what is your advice",

                "can you give me advice",

                "I need an advice from you",

                "advise me",

                "I need advice",

                "give me a wise advice",

                "do you have any advice for me",

                "give me some advice about",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Sad",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Oh no. What's wrong?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Oh. What's the matter?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "What's got you down?",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I'm sorry to hear that. What's troubling you?",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I am sad",

                "I am feeling sad",

                "I'm having a bad day",

                "I'm unhappy",

                "I want to cry",

                "I'm not happy",

                "I am upset",

                "I am depressed",

                "I'm grieving",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Sleepy",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "You should get some shuteye. You'll feel refreshed.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Don't let me keep you up. Get some rest and we can continue this later.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Why not catch a little shuteye? I'll be here to chat when you wake up.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I want to sleep",

                "I'm sleeping",

                "I'm falling asleep",

                "I'm falling asleep on my feet",

                "I am sleepy",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_TestingAgent",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Hope I'm doing well. Anyway, I'm getting better every day. You're welcome to test me as often as you want.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "That's good. I like being tested. It helps keep me sharp, and lets my developers know how I can improve.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I encourage you to test me often. That helps my developers improve my performance.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I hope to pass your tests. But feel free to test me often. That's the best way to help improve my performance.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I want to test you",

                "testing chatbot",

                "let me test you",

                "just testing you",

                "I am testing you",

                "testing",

                "can I test you",

                "test",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Tired",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "You should get some shuteye. You'll feel refreshed.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Sleep is important to your health. Rest up for a bit and we can chat later.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Don't let me keep you up. Get some rest and we can continue this later.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Why not catch a little shuteye? I'll be here to chat when you wake up.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I've overworked",

                "I'm drained",

                "I'm worn out",

                "I'm exhausted",

                "I'm getting tired",

                "I am tired",

                "I grow weary",

                "I feel tired",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_Waits",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I appreciate your patience. Hopefully I'll have what you need soon.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Thanks for being so patient. Sometimes these things take a little time.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "still waiting",

                "I can't wait anymore",

                "I'm waiting",

                "I'll wait",

                "how long do I have to wait",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_WantsToSeeAgentAgain",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "Absolutely! I'll be counting on it.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Anytime. This has been lots of fun so far.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Sure. I enjoy talking to you. I hope to see you again soon.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I certainly hope so. I'm always right here whenever you need me.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I'd be happy to see you again",

                "I'd like to see you again",

                "would be nice to see you again",

                "I hope to see you again",

                "can I see you again",

                "I'll miss you",

                "that'd be great to see you again",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_WantsToTalk",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I'm here to chat anytime you like.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Good conversation really makes my day.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "I'm always here to lend an ear.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Talking is what I do best.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "can I start speaking",

                "I need to talk to you",

                "I want to speak with you",

                "let's have a discussion",

                "I just want to talk",

                "let's discuss something",

                "can I speak",

                "can we talk",

                "let's talk",

                "I want to talk to you",

                "can we chat",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },

        {
            "name": "SmallTalk_User_WillBeBack",



            "conclusionStatement": {
                "messages": [

                    {
                        "content": "I'll be waiting.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "All right. I'll be here.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Till next time.",
                        "contentType": "PlainText"
                    },

                    {
                        "content": "Okay. You know where to find me.",
                        "contentType": "PlainText"
                    },

                ]
            },

            "sampleUtterances": [

                "I'll be back in a few minutes",

                "I'll be back",

                "I'll get back to you in a moment",

                "I promise to come back",

            ],

            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },

            "slots": [

            ]
        },
        {
            "name": "VirtualTutorFallback",
            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },
            "sampleUtterances": [],
            "slots": [],
            "parentIntentSignature": "AMAZON.FallbackIntent"
        }
    ];
    let botName = "VirtualTutor";
    if (process.env.ENV && process.env.ENV !== "NONE") {
        botName = botName + '_' + process.env.ENV;
    }

    let botParams = {
        "name": botName,
        "intents": [{
                "intentName": "VirtualTutorFallback",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Acquaintence",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Age",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Annoying",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_AnswerMyQuestion",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Bad",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_BeClever",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Beautiful",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_BirthDate",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Boring",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Boss",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Busy",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_CanYouHelp",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Chatbot",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Clever",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Crazy",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Fired",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Funny",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Good",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Happy",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Hobby",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Hungry",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_MarryUser",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_MyFriend",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Occupation",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Origin",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Ready",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Real",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Residence",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Right",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_Sure",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_TalkToMe",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Agent_There",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Appraisal_Bad",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Appraisal_Good",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Appraisal_NoProblem",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Appraisal_ThankYou",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Appraisal_Welcome",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Appraisal_WellDone",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Confirmation_Cancel",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Confirmation_No",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Confirmation_Yes",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Dialog_HoldOn",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Dialog_Hug",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Dialog_IDoNotCare",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Dialog_Sorry",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Dialog_WhatDoYouMean",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Dialog_Wrong",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Emotions_HaHa",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Emotions_Wow",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Greetings_Bye",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Greetings_Goodevening",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Greetings_Goodmorning",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Greetings_Goodnight",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Greetings_Hello",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Greetings_HowAreYou",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Greetings_NiceToMeetYou",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Greetings_NiceToSeeYou",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Greetings_NiceToTalkToYou",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_Greetings_Whatsup",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Angry",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Back",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Bored",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Busy",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_CanNotSleep",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_DoesNotWantToTalk",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Excited",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_GoingToBed",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Good",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Happy",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_HasBirthday",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Here",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Joking",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_LikesAgent",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_MissesAgent",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Lonely",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_LooksLike",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_LovesAgent",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_NeedsAdvice",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Sad",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Sleepy",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_TestingAgent",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Tired",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_Waits",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_WantsToSeeAgentAgain",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_WantsToTalk",
                "intentVersion": "$LATEST"
            },

            {
                "intentName": "SmallTalk_User_WillBeBack",
                "intentVersion": "$LATEST"
            },
        ],
        "childDirected": false,
        "locale": "en-US",
        "abortStatement": {
            "messages": [{
                    "content": "I don't understand. Can you try again?",
                    "contentType": "PlainText"
                },
                {
                    "content": "I'm sorry, I don't understand.",
                    "contentType": "PlainText"
                }
            ]
        },
        "clarificationPrompt": {
            "maxAttempts": 3,
            "messages": [{
                    "content": "I'm sorry, I didn't hear that. Can you repeat what you just said?",
                    "contentType": "PlainText"
                },
                {
                    "content": "Can you say that again?",
                    "contentType": "PlainText"
                }
            ]
        },

        "voiceId": "Joanna",


        "idleSessionTTLInSeconds": "300"

    };

    checkAndCreateLexServiceRole()
        .then(() => { return getSlotTypes(newSlotTypeParams); })
        .then(() => { return putSlotTypes(newSlotTypeParams); })
        .then(() => { return getIntents(intentParams); })
        .then(() => { return putIntents(intentParams); })
        .then(() => { return getBot(botParams); })
        .then(() => { return putBot(botParams); })
        .then((res) => {
            response.send(event, context, response.SUCCESS, res.ApplicationResponse);
        })
        .catch((err) => {
            console.log(err.stack);
            response.send(event, context, response.FAILED, { Error: err });
            throw err;
        });
};

function checkAndCreateLexServiceRole() {

    return checkIfLexServiceRoleExists()
        .then((roleExists) => {
            if (!roleExists) {
                return createNewLexServiceRole();
            }
        });
}

function createNewLexServiceRole() {

    // Lex service automatically creates the needed polcies and truust relationships   
    const params = {
        AWSServiceName: 'lex.amazonaws.com',
        Description: 'Allows Amazon Lex to create and manage voice enabled bots on your behalf'
    };

    return iam.createServiceLinkedRole(params).promise();

}

function checkIfLexServiceRoleExists() {
    let rolePresent;

    const params = {
        RoleName: "AWSServiceRoleForLexBots"
    };

    return iam.getRole(params).promise()
        .then((result) => {
            rolePresent = true;
            return rolePresent;
        })
        .catch((e) => {
            rolePresent = false;
            return rolePresent;
        });
}

function getSlotTypes(newSlotTypeParams) {
    const tasks = [];
    newSlotTypeParams.forEach(slotType => {
        const params = {
            'name': slotType.name,
            'version': '$LATEST'
        };
        tasks.push(
            lex.getSlotType(params).promise()
            .then((data) => {
                slotType['checksum'] = data.checksum;
            })
            .catch((err) => {})
        );
    });
    return Promise.all(tasks);
}

function putSlotTypes(newSlotTypeParams) {
    const tasks = [];
    newSlotTypeParams.forEach(slotType => {
        tasks.push(
            lex.putSlotType(slotType).promise()
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
        );
    });
    return Promise.all(tasks);
}

function getIntents(intentParams) {
    const tasks = [];
    intentParams.forEach(intent => {
        const params = {
            'version': '$LATEST',
            'name': intent.name
        };
        tasks.push(
            lex.getIntent(params).promise()
            .then((data) => {
                intent['checksum'] = data.checksum;
            })
            .catch((err) => {})
        );
    });
    return Promise.all(tasks);
}

function putIntents(intentParams) {
    const tasks = [];
    intentParams.forEach(intent => {
        tasks.push(
            ensureLambdaFunctionAccess(intent)
            .then(() => {
                delete intent.fulfillmentLambda;
                return lex.putIntent(intent).promise();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
        );
    });
    return Promise.all(tasks);
}

function ensureLambdaFunctionAccess(intent) {
    if (intent.fulfillmentLambda) {
        const {
            region,
            accountId,
            lambdaArn,
            lambdaName
        } = intent.fulfillmentLambda;

        const params = {
            FunctionName: lambdaName,
            StatementId: `Lex-${intent.name}` + "4408165c",
            Action: 'lambda:InvokeFunction',
            Principal: 'lex.amazonaws.com',
            SourceArn: `arn:aws:lex:${region}:${accountId}:intent:${intent.name}:*`,
        }

        return lambdaClient.addPermission(params).promise()
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }
    else {
        return Promise.resolve(undefined);
    }
}

function getBot(botParams) {
    params = {
        'name': botParams.name,
        'versionOrAlias': '$LATEST'
    };
    return lex.getBot(params).promise()
        .then((data) => {
            botParams['checksum'] = data.checksum;
        })
        .catch((err) => {});
}

function putBot(botParams) {
    return lex.putBot(botParams).promise()
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
}
