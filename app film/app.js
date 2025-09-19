import express from 'express'
const port = 3000
const app = express()

app.listen(port, () =>{
    console.log('a szerver a ${port}. porton fut.')
})

app.use(express.json());

const users =[
    {id: 1, cim: 'alice in wonderland', ev: 2020},
    {id: 2, cim: '2521', ev: 2021},
    {id: 3, cim: 'tomorrow', ev: 2019}
]

app.get("/users", (req, res) => {
    res.status(200).json(users);
})

app.get("/users/:id", (req, res) => {
    const uid=parseInt(req.params.id);
    const user=users.find(user => user.id == uid);
    if(!user){
        return res.status(404).json({message: "a film nem talalhato."});
    }
    res.status(200).json(user);
});

app.post("/users", (req, res) => {
    const {cim, ev} = req.body;
    if(!cim || !ev){
        return res.status(404).json({message: "ervenytelen adatok."});
    }
    const id=users[users.length-1]?.id + 1;
    const user= {id, cim, ev};
    users.push(user);
    res.status(201).json(user);
});

app.put("/users/:id", (req, res) => {
    const uid=Number(req.params.id);
    const user=users.find(user => user.id == uid);
    if(!user){
        return res.status(404).json({message: "a film nem talalhato."});
    }
    const {cim, ev} = req.body;
    if(!cim || !ev){
        return res.status(404).json({message: "ervenytelen adatok."});
    }
    const index = users.indexOf(user);
    users[index]={
        id: user.id,
        cim: cim,
        ev: ev
    };
    res.status(200).json(users[index]);
});

app.delete("/users/:id", (req, res) => {
    const uid=+req.params.id;
    const user=users.find(user => user.id == uid);
    if(!user){
        return res.status(404).json({message: "a film nem talalhato."});
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(200).json({message: "sikeres torles."});
});

app.patch("/users/:id", (req, res) => {
    const uid=+req.params.id;
    const user=users.find(user => user.id == uid);
    if(!user){
        return res.status(404).json({message: "a film nem talalhato."});
    }
    const {cim, ev} = req.body;
    const index = users.indexOf(user);
    users[index]={
        id: user.id,
        cim: cim || user.cim,
        ev: ev || user.ev,
    };
    res.status(200).json(users[index]);
});