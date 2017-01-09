/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//extra var for image pre loading and handeling
var NameList = ["Burrow.jpg", "BurrowEplodCapt.jpg", "Bane.jpg", "BurrowEplod.jpg"];
var MineStateEnum = {NothingDone : 0, Checked: 1, QMarked: 2, Marked:3};
var NumberShown =0;
var NumberNeeded =0;
//class For the mine
function MineSpace(Col, Row,IsMine)
{
    this.X = Col;
    this.Y = Row;
    this.bIsMine = IsMine;
    this.bIsShown = false;
    this.State = MineStateEnum.NothingDone;
    this.Display = NameList[0];
    this.Count = 0;
    this.But = document.getElementById("B" + this.X.toString() + ","+ this.Y.toString());
    
    this.NotifyOthersOfDoom = function()
    {
        for(var k=-1; k < 2; k++)
        {
            for(var l=-1; l < 2; l++)
            {
                
                var temp2X = this.X + k;
                var temp2Y = this.Y + l;
                if(!(temp2X + k === this.X && temp2Y + l === this.Y))
                {
                if (temp2X >=0 && temp2X < Cols && temp2Y < Rows && temp2Y >=0)
                {
                    Mines[temp2X][temp2Y].Count++;
                }
                }
            }
        }
    };
    
    this.Show = function()
    {
        if (!this.bIsShown)
        {
        switch(this.State)
        {
            case MineStateEnum.NothingDone:
                this.But.style.background = "url('Image/" + NameList[0] + "')";
                this.But.style.color = "#990099";
                this.But.innerHTML = ".";
                break;
            case MineStateEnum.Marked:
                this.But.style.background = "url('Image/" + NameList[1] + "')";
                this.But.style.color = "Green";
                this.But.innerHTML = "!";
                break;
            case MineStateEnum.QMarked:
                this.But.style.background = "url('Image/" + NameList[2] + "')";
                this.But.style.color = "Green";
                this.But.style.fontSize = "50px";
                this.But.innerHTML = "?";
                break;
            case MineStateEnum.Checked:
                this.bIsShown= true;
                this.But.innerHTML = ".";
                if (this.bIsMine)
                {
                this.But.style.background = "url('Image/" + NameList[3] + "')";
                }
                else
                {
                if(this.Count === 0)
                    this.But.style.color = "Black";
                else
                {
                    this.But.style.color = "Green";
                    this.But.innerHTML = this.Count;
                }
                this.But.style.background = "Black";
                };
                break;
            default:
                break;
        }
    }
        
    };
    
    this.Bind = function()
    {
        this.But.MyOwner = this;
        this.But.addEventListener("click", function() { 
        switch(document.getElementById("Markers").value)
        {
            case "Mark":
                this.MyOwner.State = MineStateEnum.Marked;
                break;
            case "Check":
                Check(this.MyOwner.X ,this.MyOwner.Y, true);
                break;
            case "QMark":
                this.MyOwner.State = MineStateEnum.QMarked;
                break;
            case "UnMark":
                this.MyOwner.State = MineStateEnum.NothingDone;
                break;
            default:
                break;
        }
        this.MyOwner.Show();
    });
    };
}


var Mines;
var Cols;
var Rows;
var MineCount;


function fInit()
{
    // Pre load images better if not wait time on button
    var ImageObjs = [document.createElement("IMG"), document.createElement("IMG"), document.createElement("IMG"), document.createElement("IMG")];
    
    for	(i = 0; i < ImageObjs.length; i++) 
    {
     ImageObjs[i].src = "Image/" + NameList[i];
     ImageObjs[i].alt = "Image/" + NameList[i];
    }
    // end image load
    return;
}

function NewGame()
{
    if (document.getElementById("Difficultly").value === "Hard")
        MineCount = Math.floor(Cols * Rows * 0.6);    
    if (document.getElementById("Difficultly").value === "Normal")
        MineCount = Math.floor(Cols * Rows * 0.5);      
    if (document.getElementById("Difficultly").value === "Easy")
        MineCount = Math.floor(Cols * Rows * 0.3);
    if (document.getElementById("Difficultly").value === "VeryEasy")
        MineCount = Math.floor(Cols * Rows * 0.1); 
    if (MineCount <= 0)
        MineCount = 1;
    NumberShown =0;
    NumberNeeded = Rows* Cols - MineCount;
    Mines = [];
    for(var i=0; i < Cols; i++)
    {
        Mines.push([]);
        for(var j=0; j < Rows; j++)
        {
            Mines[i].push(new MineSpace(i, j, false));
            Mines[i][j].Bind();
        }
    }
    while(MineCount > 0)
    {
        var tempX = Math.floor(Math.random() * Cols);
        var tempY = Math.floor(Math.random() * Rows);
        if(!Mines[tempX][tempY].bIsMine)
        {
            Mines[tempX][tempY].bIsMine = true; 
            Mines[tempX][tempY].NotifyOthersOfDoom();
            MineCount--;
        }
    }
}

function NewGrid()
{
       var X = $("#X").val();
       var Y = $("#Y").val();
       if (!isNaN(X) && !isNaN(Y) && X > 2 && Y > 2)
       {
           X = Math.floor(X);
           Y = Math.floor(Y);
           if (done)
           {
               var temp = document.getElementById("NewGame");
               temp.parentNode.removeChild(temp);
           }
           else 
               done = true;
           var NewGame = document.createElement("T");
           NewGame.setAttribute("id", "NewGame");
           document.getElementById("BuildSpace").appendChild(NewGame);
    
    
            for(var y = 0; y < Y; ++y)
            {
        
            var row = document.createElement("tr");
            row.setAttribute("id", "y" + y);
            row.style.padding = "0px";
            document.getElementById("NewGame").appendChild(row);
            
        
            for(var x = 0; x < X; ++x)
            {
                var col = document.createElement("td");
                col.style.padding = "0px";
            
                var but = document.createElement("button");
                but.type = "button";
                but.style.padding = "0px";
                but.style.background = "url('Image/" + NameList[0] + "')";
                but.style.width = "66px";
                but.style.height = "66px";
                but.style.fontSize = "50px";
                but.style.color = "#990099";
                but.setAttribute("id", "B" + x + ","+ y);
                but.innerHTML = ".";
            
                col.appendChild(but);
            
                document.getElementById("y" + y).appendChild(col);
            }
        }
        $("#BuildSpace").innerHTML = NewGame;
        Cols = X;
        Rows = Y;
       }
       else
       {
           window.alert("Error Please use numbers that when truncated are greater than 2. Please note floats will be truncated"); 
       }
    
}

function Check(inX, inY, bFirstTime)
{
    if(!Mines[inX][inY].bIsShown)
    {
    if (bFirstTime && Mines[inX][inY].bIsMine)
    {
        for(var i=0; i < Cols; i++)
    {
        for(var j=0; j < Rows; j++)
        {
            Mines[i][j].State = MineStateEnum.Checked;
            Mines[i][j].Show();
        }
    }
    window.alert("GameOver");
        return;
    }
    if (Mines[inX][inY].bIsMine)
        return;
    
    NumberShown++;
        Mines[inX][inY].State = MineStateEnum.Checked;
        Mines[inX][inY].Show();
        for(var k=-1; k < 2; k++)
        {
            for(var l=-1; l < 2; l++)
            {
                
                var temp2X = inX + k;
                var temp2Y = inY + l;
                if(!(temp2X + k === inX && temp2Y + l === inY))
                {
                if (temp2X >=0 && temp2X < Cols && temp2Y < Rows && temp2Y >=0)
                {
                    Check(temp2X, temp2Y, false);
                }
                }
                
            }
        }
        if (NumberNeeded === NumberShown && !game)
        {
            game = true;
        for(var i=0; i < Cols; i++)
    {
        for(var j=0; j < Rows; j++)
        {
            Mines[i][j].State = MineStateEnum.Checked;
            Mines[i][j].Show();
        }
    }
    window.alert("Victory");
        return;
        
    }    

}
}
var game = false;
var done = false;
$(document).ready(function()
{
    fInit();
    
   $("#New").click(function(){
    game = false;
    NewGrid();
    NewGame();
   });
   
   
    
    
});

