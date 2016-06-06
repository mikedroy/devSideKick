console.log('Background File');

//This will act as our router for actions.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('therequest:', request);

    //TODO: Get the request name sent, switch statement to send off to other functions to handle logic.



    //TODO: Move this logic to hideCurrentElementsInList()
    hideList = JSON.parse(request.elements);
    hideList.forEach(function (element){    	
    	$(element).hide();
    });
    //END TODO;

	}
);

//Currently Unused but you will get the idea. Test Change.
function hideCurrentElementsInList(theList)
{
	theList.forEach(function (element){    	
    	$(element).hide();
    });
}