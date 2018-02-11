var discord = require('discord.js');
var roblox = require('roblox-js');
var client = new discord.Client();
var token = (process.env.BOT_TOKEN)
client.login(token)
var Username = (process.env.Username)
var Password =  (process.env.Password)

roblox.login({Username, Password}).then((success) => {

}).catch(() => {console.log("Failed to login.");});

client.on("ready", () => {
  client.user.setActivity(${client.guilds.size} servers | !help | !invite);
  console.log(Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.);
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let user = member.user
  console.log(${user.tag} joined ${guild})
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  let user = member.user
  console.log(${user.tag} left ${guild})
});

client.on('message', (message) => {
    console.log(${message.author} said ${message.content})
});

var groupId = 3248498;
var maximumRank = 20

client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('Promote', message)){
        var username = args[1]
        if (username){
            message.channel.send(`Checking ROBLOX for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                        message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } else {
                        message.channel.send(`${id} is rank ${rank} and promotable.`)
                        roblox.promote(groupId, id)
                        .then(function(roles){
                            message.channel.send(`Promoted from ${roles.oldRole.Name} to ${roles.newRole.Name}`)
                        }).catch(function(err){
                            message.channel.send("Failed to promote.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("Couldn't get him in the group.")
                });
            }).catch(function(err){ 
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
            });
        } else {
            message.channel.send("Please enter a username.")
        }
        return;
    }
});