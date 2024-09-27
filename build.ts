import fs from 'fs';

function build(){
    console.log('Copying public folder to ./dist');
    fs.cpSync('./src/public/', './dist/public/', {recursive: true});
    console.log('Complete.');
}

build();