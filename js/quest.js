
var quest = {
    "intro": [ "Hello, rookie..." ,
               "I see you were sent to become a hero, huh? Too bad for you, Ha!",
               "Well, prove your self usefull, if you can.",
               "Go down the Gathor dungeon, get back the amulet he stole and we will see..."],
    "ending": [ "Congratulations, boy!",
                "How 'luck' we are to have yet another hero now..." ,
                "Hooray!", "Hooray!", "Hooray!"],
    "badEnding": ["Sorry boy, you are dead!"],
    "start": {
        "map": "entrance",
        "x": 1,
        "y": 1
    },
    "maps": {
        "entrance": {
            "name":"entrance",
            "sprite": {
                "config": {
                    "1": {
                        "2": "wall",
                        "9": "floor"
                    }
                }
            },
            "tiles": [
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ]
            ],
            "entities": [
                {
                    "name":"entrance-door",
                    "autoDraw": true,
                    "type":"exit",
                    "item":"amulet",
                    "x": 0 * 16,
                    "y": 1 * 16,
                    "sprite": {
                        "x":6,
                        "y":0
                    }
                },
                {
                    "name":"hall-door",
                    "autoDraw": true,
                    "type":"door",
                    "x": 7 * 16,
                    "y": 1 * 16,
                    "sprite": {
                        "x":2,
                        "y":0
                    },
                    "goTo": {"map":"hall","x":1,"y":2}
                }
            ]
        },
        "hall": {
            "name":"hall",
            "sprite": {
                "config": {
                    "1": {
                        "2": "wall",
                        "9": "floor"
                    }
                }
            },
            "tiles": [
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ]
            ],
            "entities": [
                {
                    "name":"entrance-door",
                    "type":"door",
                    "sprite": {
                        "y":0,
                        "x":2
                    },
                    "autoDraw":true,
                    "y": 2 * 16,
                    "x": 0 * 16,
                    "goTo":{"map":"entrance","x":6,"y":1}
                },
                {
                    "name":"bookcase",
                    "type":"message",
                    "message":"Hello, adventurer!",
                    "sprite": {
                        "y":4,
                        "x":8
                    },
                    "autoDraw":true,
                    "y": 1 * 16,
                    "x": 3 * 16,
                    "goTo":{"map":"entrance","x":1,"y":6}
                },
                {
                    "name":"bed",
                    "type":"save",
                    "sprite": {
                        "y":4,
                        "x":9
                    },
                    "autoDraw":true,
                    "y": 2 * 16,
                    "x": 6 * 16
                },
                {
                    "name":"goblin-door",
                    "type":"door",
                    "sprite": {
                        "y":0,
                        "x":2
                    },
                    "autoDraw":true,
                    "y": 8 * 16,
                    "x": 7 * 16,
                    "goTo":{"map":"goblin-room-1","x":1,"y":8}
                }
            ]
        },
        "goblin-room-1":{
            "name":"goblin-room-1",
            "sprite": {
                "config": {
                    "1": {
                        "2": "wall",
                        "9": "floor"
                    }
                }
            },
            "tiles": [
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ]
            ],
            "entities": [
                {
                    "name":"hall-door",
                    "type":"door",
                    "sprite": {
                        "y":0,
                        "x":2
                    },
                    "autoDraw":true,
                    "y": 8 * 16,
                    "x": 0 * 16,
                    "goTo":{"map":"hall","x":6,"y":8}
                },
                {
                    "name":"chest-1",
                    "type":"chest",
                    "sprite": {
                        "y":4,
                        "x":4
                    },
                    "opened": {
                        "y":4,
                        "x":5
                    },
                    "item": {
                        "name":"potion-1",
                        "type":"potion",
                        "sprite": {
                            "y":5,
                            "x":7
                        }
                    },
                    "autoDraw":true,
                    "x":2 * 16,
                    "y":1 * 16
                },
                {
                    "name":"bad-door",
                    "type":"door",
                    "sprite": {
                        "y":0,
                        "x":2
                    },
                    "autoDraw":true,
                    "y": 1 * 16,
                    "x": 5 * 16,
                    "goTo":{"map":"bad-room","x":1,"y":1}
                },
                {
                    "name":"goblin-1",
                    "type":"monster",
                    "life":5,
                    "maxLife":5,
                    "attack": 2,
                    "defense":1,
                    "sprite": {
                        "x":1,
                        "y":3
                    },
                    "dead": {
                        "x":5,
                        "y":5
                    },
                    "x": 3 * 16,
                    "y": 2 * 16,
                    "autoDraw":true
                }
            ]
        },
        "bad-room": {
            "name":"bad-room",
            "sprite": {
                "config": {
                    "1": {
                        "2": "wall",
                        "9": "floor"
                    }
                }
            },
            "tiles": [
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ]
            ],
            "entities": [
                {
                    "name":"goblin-door",
                    "type":"door",
                    "sprite": {
                        "y":0,
                        "x":2
                    },
                    "autoDraw":true,
                    "y": 1 * 16,
                    "x": 0 * 16,
                    "goTo":{"map":"goblin-room-1","x":4,"y":1}
                },
                {
                    "name":"locked-door",
                    "type":"door",
                    "locked": "a-key",
                    "sprite": {
                        "y":0,
                        "x":8
                    },
                    "autoDraw": true,
                    "y": 2 * 16,
                    "x": 8 * 16,
                    "goTo":{"map":"corridor","x":1,"y":2}
                },
                {
                    "name":"key-room-door",
                    "type":"door",
                    "sprite": {
                        "y":0,
                        "x":2
                    },
                    "autoDraw": true,
                    "y": 15 * 16,
                    "x": 3 * 16,
                    "goTo":{"map":"key-room","x":3,"y":1}
                },
                {
                    "name":"goblin-2",
                    "type":"monster",
                    "life":5,
                    "maxLife":5,
                    "attack": 2,
                    "defense":1,
                    "sprite": {
                        "x":1,
                        "y":3
                    },
                    "dead": {
                        "x":5,
                        "y":5
                    },
                    "x": 3 * 16,
                    "y": 2 * 16,
                    "autoDraw":true
                },
                {
                    "name":"goblin-3",
                    "type":"monster",
                    "life":5,
                    "maxLife":5,
                    "attack": 2,
                    "defense":1,
                    "sprite": {
                        "x":1,
                        "y":3
                    },
                    "dead": {
                        "x":5,
                        "y":5
                    },
                    "x": 6 * 16,
                    "y": 8 * 16,
                    "autoDraw":true
                }
            ]
        },
        "key-room":{
            "name":"key-room",
            "sprite": {
                "config": {
                    "1": {
                        "2": "wall",
                        "9": "floor"
                    }
                }
            },
            "tiles": [
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ]
            ],
            "entities": [
                {
                    "name":"bad-door",
                    "type":"door",
                    "sprite": {
                        "y":0,
                        "x":2
                    },
                    "autoDraw":true,
                    "y": 0 * 16,
                    "x": 1 * 16,
                    "goTo":{"map":"bad-room","x":3,"y":14}
                },
                {
                    "name":"minotaur-1",
                    "type":"monster",
                    "life":10,
                    "maxLife":10,
                    "attack": 4,
                    "defense":3,
                    "sprite": {
                        "x":3,
                        "y":3
                    },
                    "dead": {
                        "x": 5,
                        "y": 5
                    },
                    "x": 5 * 16,
                    "y": 5 * 16,
                    "autoDraw":true
                },
                {
                    "name":"chest-2",
                    "type":"chest",
                    "sprite": {
                        "y":4,
                        "x":4
                    },
                    "opened": {
                        "y":4,
                        "x":5
                    },
                    "item": {
                        "name":"a-key",
                        "type":"key",
                        "sprite": {
                            "y": 4,
                            "x": 0
                        }
                    },
                    "autoDraw":true,
                    "x": 6 * 16,
                    "y": 5 * 16
                }
            ]
        },
        "corridor": {
            "name":"corridor",
            "sprite": {
                "config": {
                    "1": {
                        "2": "wall",
                        "9": "floor"
                    }
                }
            },
            "tiles": [
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ]
            ],
            "entities": [
                {
                    "name":"bad-door",
                    "type":"door",
                    "sprite": {
                        "y":0,
                        "x":2
                    },
                    "autoDraw":true,
                    "y": 2 * 16,
                    "x": 0 * 16,
                    "goTo":{"map":"bad-room","x":7,"y":2}
                },
                {
                    "name":"somebooks0",
                    "type":"message",
                    "message":"It is known that this dungeon was not Gathor's original.",
                    "sprite": {
                        "y":4,
                        "x":8
                    },
                    "y": 4 * 16,
                    "x": 1 * 16,
                    "autoDraw": true
                },
                {
                    "name":"somebooks1",
                    "type":"message",
                    "message":"This was build by some crazy boy, an 'analyst', for whatever that means...",
                    "sprite": {
                        "y":4,
                        "x":8
                    },
                    "y": 6 * 16,
                    "x": 1 * 16,
                    "autoDraw": true
                },
                {
                    "name":"somebooks2",
                    "type":"message",
                    "message":"The boy talked some code.",
                    "sprite": {
                        "y":4,
                        "x":8
                    },
                    "y": 8 * 16,
                    "x": 1 * 16,
                    "autoDraw": true
                },
                {
                    "name":"somebooks3",
                    "type":"message",
                    "message":"If you follow his 'coded' direction, you may be able to pass.",
                    "sprite": {
                        "y":4,
                        "x":8
                    },
                    "y": 10 * 16,
                    "x": 1 * 16,
                    "autoDraw": true
                },
                {
                    "name":"pit-door",
                    "type":"door",
                    "goTo":{"map":"pit","x":1,"y":14},
                    "sprite": {
                        "y":0,
                        "x":2
                    },
                    "autoDraw": true,
                    "y": 10 * 16,
                    "x": 5 * 16
                }
            ]
        },
        "pit": {
            "name":"pit",
            "sprite": {
                "config": {
                    "1": {
                        "2": "wall",
                        "8": "trap",
                        "9": "floor"
                    }
                }
            },
            "tiles": [
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,8],[1,8],[1,8],[1,8],[1,8],[1,8],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,8],[1,8],[1,8],[1,8],[1,8],[1,8],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,8],[1,8],[1,8],[1,8],[1,8],[1,8],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,8],[1,8],[1,8],[1,8],[1,8],[1,8],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,8],[1,8],[1,8],[1,8],[1,8],[1,8],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,8],[1,8],[1,8],[1,8],[1,8],[1,8],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,8],[1,8],[1,8],[1,8],[1,8],[1,8],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,8],[1,8],[1,8],[1,8],[1,8],[1,8],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,8],[1,8],[1,8],[1,8],[1,8],[1,8],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,8],[1,8],[1,8],[1,8],[1,8],[1,8],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,8],[1,8],[1,8],[1,8],[1,8],[1,8],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,8],[1,8],[1,8],[1,8],[1,8],[1,8],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,9],[1,9],[1,8],[1,8],[1,8],[1,8],[1,8],[1,8],[1,9],[1,9],[1,2] ],
                [ [1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2] ]
            ],
            "entities": [
                {
                    "name":"minotaur-pit",
                    "type":"monster",
                    "life":10,
                    "maxLife":10,
                    "attack": 4,
                    "defense":3,
                    "sprite": {
                        "x":3,
                        "y":3
                    },
                    "dead": {
                        "x": 5,
                        "y": 5
                    },
                    "x": 9 * 16,
                    "y": 1 * 16,
                    "autoDraw":true
                },
                {
                    "name":"goblin-pit",
                    "type":"monster",
                    "life":5,
                    "maxLife":5,
                    "attack": 2,
                    "defense":1,
                    "sprite": {
                        "x":1,
                        "y":3
                    },
                    "dead": {
                        "x":5,
                        "y":5
                    },
                    "x": 1 * 16,
                    "y": 9 * 16,
                    "autoDraw":true
                },
                {
                    "name":"corridor-door",
                    "type":"door",
                    "sprite": {
                        "y":0,
                        "x":2
                    },
                    "autoDraw":true,
                    "y": 14 * 16,
                    "x": 0  * 16,
                    "goTo":{"map":"corridor","x":4,"y":10}
                },
                {
                    "name":'stair-down',
                    "type":'door',
                    "autoDraw":true,
                    "goTo":{"map":"damn-room","x":1,"y":2},
                    "sprite": {"x":3,"y":1},
                    "x":10*16,
                    "y":2*16
                }
            ]
        },
        "damn-room": {
            "name":"damn-room",
            "sprite": {
                "config": {
                    "1": {
                        "2": "wall",
                        "9": "floor"
                    }
                }
            },
            "tiles": [
                [[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]]
            ],
            "entities": [
                {
                    "name":"stair-up",
                    "type":"door",
                    "goTo":{"map":"pit","x":10,"y":3},
                    "autoDraw":true,
                    "sprite":{"x":4,"y":1},
                    "x":1 * 16,
                    "y":1 * 16
                },
                {
                    "name":"gran-room-door",
                    "type":"door",
                    "goTo":{"map":"gran-room","x":1,"y":8},
                    "autoDraw":true,
                    "sprite":{"x":6,"y":0},
                    "x":8 * 16,
                    "y":8 * 16
                },
                {
                    "name":"bed",
                    "type":"save",
                    "sprite": {
                        "y":4,
                        "x":9
                    },
                    "autoDraw":true,
                    "y": 8 * 16,
                    "x": 2 * 16
                },
                {
                    "name":"chest-2",
                    "type":"chest",
                    "sprite": {
                        "y":4,
                        "x":4
                    },
                    "opened": {
                        "y":4,
                        "x":5
                    },
                    "item": {
                        "name":"potion-2",
                        "type":"potion",
                        "sprite": {
                            "y":5,
                            "x":7
                        }
                    },
                    "autoDraw":true,
                    "x":7 * 16,
                    "y":3 * 16
                },
                {
                    "name":"chest-3",
                    "type":"chest",
                    "sprite": {
                        "y":4,
                        "x":4
                    },
                    "opened": {
                        "y":4,
                        "x":5
                    },
                    "item": {
                        "name":"potion-3",
                        "type":"potion",
                        "sprite": {
                            "y":5,
                            "x":7
                        }
                    },
                    "autoDraw":true,
                    "x":7 * 16,
                    "y":4 * 16
                },
                {
                    "name":"chest-4",
                    "type":"chest",
                    "sprite": {
                        "y":4,
                        "x":4
                    },
                    "opened": {
                        "y":4,
                        "x":5
                    },
                    "item": {
                        "name":"potion-4",
                        "type":"potion",
                        "sprite": {
                            "y":5,
                            "x":7
                        }
                    },
                    "autoDraw":true,
                    "x":7 * 16,
                    "y":5 * 16
                },
                {
                    "name":"chest-5",
                    "type":"chest",
                    "sprite": {
                        "y":4,
                        "x":4
                    },
                    "opened": {
                        "y":4,
                        "x":5
                    },
                    "item": {
                        "name":"potion-5",
                        "type":"potion",
                        "sprite": {
                            "y":5,
                            "x":7
                        }
                    },
                    "autoDraw":true,
                    "x":7 * 16,
                    "y":6 * 16
                },
                {
                    "name":"bookcase",
                    "type":"message",
                    "message":"Dear diary: I Just stole a nice amulet. Gathor.",
                    "sprite": {
                        "y":4,
                        "x":8
                    },
                    "autoDraw":true,
                    "y": 1 * 16,
                    "x": 3 * 16
                }
            ]        
        },
        "gran-room": {
            "name":"gran-room",
            "sprite": {
                "config": {
                    "1": {
                        "2": "wall",
                        "9": "floor"
                    }
                }
            },
            "tiles": [
                [[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,9],[1,2]],
                [[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]]
            ],
            "entities": [
                {
                    "name":"back-to-damn-room",
                    "type":"door",
                    "goTo":{"map":"damn-room","x":7,"y":8},
                    "autoDraw":true,
                    "sprite":{"x":6,"y":0},
                    "x":0 * 16,
                    "y":8 * 16
                },
                {
                    "name":"chest-last",
                    "type":"chest",
                    "sprite": {
                        "y":4,
                        "x":4
                    },
                    "opened": {
                        "y":4,
                        "x":5
                    },
                    "item": {
                        "name":"amulet",
                        "type":"amulet",
                        "sprite": {
                            "y":5,
                            "x":4
                        }
                    },
                    "autoDraw":true,
                    "x":7 * 16,
                    "y":1 * 16
                },
                {
                    "name":"boss",
                    "type":"monster",
                    "life":20,
                    "maxLife":20,
                    "attack":5,
                    "defense":5,
                    "sprite":{
                        "x":6,
                        "y":3
                    },
                    "dead": {
                        "x": 5,
                        "y": 5
                    },
                    "x": 3 * 16,
                    "y": 4 * 16,
                    "autoDraw":true
                }
            ]
        }
    }
};


