const EventEmitter = require('events');

const customEmitter = new EventEmitter();

customEmitter.on('messaggio',(nome,anno)=>{
    console.log(`Ciao, sono ${nome}, sono nato nel ${anno}`);
})

customEmitter.emit('messaggio', 'Elisa', 1984);

const {createReadStream,readFileSync,writeFileSync} = require('fs');

/* Scrittura del filegrande.txt
for (let i = 0; i < 1000; i++) {
    writeFileSync('./filegrande.txt', `Ciao riga numero ${i}\n`, {flag:'a'})
} 
*/

/* lettura senza stream
const filegrande = readFileSync('./filegrande.txt','utf8')
console.log(filegrande); */

/* Lettura con stream */
const stream = createReadStream('./filegrande.txt');
stream.on('data',(result)=>{
    console.log(result);
})