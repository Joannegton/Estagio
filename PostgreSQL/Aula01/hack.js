alert(" \n\n⌊ CMSP Plataformas Hacks INICIADO! ⌉\n\nAproveite para fazer suas tarefas, assim o estado não enche o saco!\n\n ");
let originalParse = JSON.parse;
JSON.parse = function (t, e) {
    let o = originalParse(t, e);
    try {
        const t = JSON.parse(o.data.assessmentItem.item.itemData);
        t.question && t.question.content && t.question.content[0] === t.question.content[0].toUpperCase() && (console.log(t),
            t.question.content = "[[%E2%98%83 radio 0]] \n\n\n [[%E2%98%83 explanation 0]]",
            t.question.widgets = {
                "radio 0": {
                    options: {
                        choices: [
                            { content: "✅┃Correto", correct: !0 },
                            { content: "❌┃Incorreto", correct: !1 }
                        ]
                    }
                },
                "explanation 0": {
                    options: {
                        explanation: "Esse script foi criado por ilytobias ( **[Khan Destroyer](https://github.com/ilytobias/Khan-Destroyer)** ) e editado e melhorado por DarkMode ( **[CMSP Plataformas Hacks](https://github.com/DarkMod3/CMSP-Plataformas-Hacks)** )",
                        hidePrompt: "Créditos",
                        showPrompt: "Créditos"
                    }
                }
            },
            o.data.assessmentItem.item.itemData = JSON.stringify(t))
    } catch (t) { } return o
}, location.softReload = () => { const t = document.getElementsByTagName("html")[0].outerHTML; document.open(), document.write(t), document.close() }, location.softReload();