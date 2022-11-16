console.clear();

const mineflayer = require('mineflayer');

const conf = require('./setting.json');
const bot = mineflayer.createBot({
    host: conf.host,
    port: conf.port,
    username: conf.username
})

function lookPlayer() {
    const FillterPlayer = (entity) => entity.type  === 'player'
    const playerEntity = bot.nearestEntity(FillterPlayer)

    if (!playerEntity) return

    const position = playerEntity.position.offset(0, playerEntity.height, 0)
    bot.lookAt(position)
}

function sayspawn() {
    console.log('I Spawn!')
}

function onKick() {
    console.log('I have been kicked from the server!')
}

bot.once('spawn', sayspawn)
bot.once('kicked', onKick)

console.log(`Login at ${conf.username}`)
bot.on('physicTick', lookPlayer)
bot.on('chat', (username, message) => {
    console.log(`<${username}>  "${message}"`)
})

bot.on('end', () => {
    console.log('Bot disconnected');
});