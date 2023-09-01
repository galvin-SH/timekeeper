$(function () {
    const currentDayEl = $("#currentDay");
    const containerEl = $(".container-lg");
    const buttonEl = $(".button")

    //Dynamically retrieves the current day and assigns its value to the element with ID currentDay
    function getCurrentDay() {
        currentDayEl.text("Today is " + dayjs().format("dddd, D MMMM YYYY"));
    }

    //Dynamically creates hour blocks for the current day
    function makeHourBlocks() {
        for (i = 10; i <= 20; i++) {
            let timeContainer = $("<div>");
            let hourBlock = $("<section>");
            let textBlock = $("<textarea>");
            let buttonBlock = $("<button>");
            let icon = $("<i>");
            timeContainer.attr("id", `time-${i}`).addClass("row time-block");
            hourBlock.attr("id", `hour-${i}`).text(i).addClass("col-2 col-md-1 hour text-center py-3");
            textBlock.attr("id", `text-${i}`).attr("rows", 3).addClass("col-8 col-md-10 description");
            buttonBlock.attr("id", `button-${i}`).attr("aria-label", "save").addClass("btn saveBtn col-2 col-md-1");
            icon.attr("aria-hidden", true).addClass("fas fa-save");
            buttonBlock.append(icon);
            timeContainer.append(hourBlock).append(textBlock).append(buttonBlock);
            containerEl.append(timeContainer);
            compareTime(i);
        }
    }
    //Checks current time versus the hour block's time and styles it appropriately
    function compareTime(index) {
        const timeBlockEls = $(".hour");
        const currentTime = new Date(Date.now()).toTimeString().slice(0, 2); //returns the current hour in 24-hour format
        if (currentTime > timeBlockEls.eq(index).text()) //PAST
        {
            timeBlockEls.parent().addClass("past")
        }
        else if (currentTime == timeBlockEls.eq(index).text()) //PRESENT
        {
            timeBlockEls.parent().addClass("present")
        }
        else if (currentTime < timeBlockEls.eq(index).text()) //FUTURE
        {
            timeBlockEls.parent().addClass("future")
        }
    }


    //event listener for clicks on a save button
    buttonEl.on("click", function () {
        localStorage.setItem("event", buttonEl.sibblings("textarea").in)
    });



    getCurrentDay();
    makeHourBlocks();

});



