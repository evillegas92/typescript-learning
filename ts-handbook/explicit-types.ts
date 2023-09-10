function greet(personName: string, date: Date) {
    console.log(`Hello ${personName}, today is ${date.toDateString()}!`);
}

greet("maddison", new Date());