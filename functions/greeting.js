// This is your new function. To start, set the name and path on the left.

exports.greeting = async function (context, event, callback) {
  try {
    let Say;
    let Prompt;
    let Listen = false;
    let Collect = false;
    let Remember = {};
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;

    const Memory = JSON.parse(event.Memory);

    Remember.repeat = false;
    Remember.transfer_agent = false;
    Remember.from_task = 'greeting';
    // this update from VS code.

    Say = `To talk to an agent say agent or press 1, otherwise we can end the call.`;
    Listen = {
      "voice_digits": {
        "num_digits": 1,
        "finish_on_key": "#",
        "redirects": {
          1: "task://agent_transfer"
        }
      }
    };
    Tasks = ['agent_transfer'];
    //End of your code.

    const functions = Runtime.getFunctions();
    let path = functions['responseBuilder'].path;
    let RB = require(path);
    await RB.responseBuilder(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);

  } catch (error) {
    console.error(error);
    callback(error);
  }
};
