const express = require("express");

module.exports = function(app) {
    const puisiList = [
        {
            title: "Senja di Ujung Hari",
            author: "Anonim",
            content: "Langit jingga berpendar syahdu,\nAngin berbisik membawa rindu.\nLangkah kaki perlahan menjauh,\nDi batas senja, kenangan bersimpuh."
        },
        {
            title: "Rintik Hujan",
            author: "Anonim",
            content: "Hujan turun menari-nari,\nMenyentuh bumi dengan lembut sekali.\nAku duduk dalam sepi,\nMenanti hadirmu di sisi."
        },
        {
            title: "Rindu yang Tertinggal",
            author: "Anonim",
            content: "Dedaunan jatuh berguguran,\nSeperti kenangan yang perlahan menghilang.\nNamun rindu tetap bertahan,\nDi sudut hati yang paling tenang."
        }
    ];

    app.get("/random/puisi", (req, res) => {
        let randomIndex = Math.floor(Math.random() * puisiList.length);
        let puisi = puisiList[randomIndex];

        res.json({
            status: true,
            result: puisi
        });
    });
};
