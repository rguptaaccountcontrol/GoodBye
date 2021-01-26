const functions = Runtime.getFunctions();
let greeting = require(functions['greeting'].path);
let agent_transfer = require(functions['agent_transfer'].path);
let fallback = require(functions['fallback'].path);

exports.handler = async (context, event, callback) => {

  const { CurrentTask } = event;
  const { CurrentInput } = event;
  const { CurrentTaskConfidence } = event;
  console.log("CurrentInput " + CurrentInput + ", CurrentTask: " + CurrentTask + ", CurrentTaskConfidence: " + CurrentTaskConfidence + "\n");

  // calling task handlers
  if (Number(CurrentTaskConfidence) ===1 || Number(CurrentTaskConfidence) === 0) {
    switch (CurrentTask) {
      case 'greeting':
        {
          console.log("CurrentTask: " + CurrentTask);
          await greeting.greeting(context, event, callback);
          break;
        }
      
      case 'agent_transfer':
        {
          console.log("CurrentTask: " + CurrentTask);
          await agent_transfer.agent_transfer(context, event, callback);
          break;
        }

      default:
        console.log("CurrentTask: " + CurrentTask);
        await fallback.fallback(context, event, callback);
        break;
    }
  }
  else {
    console.log("Fallback_CurrentTask: " + CurrentTask);
    await fallback.fallback(context, event, callback);
  }
};