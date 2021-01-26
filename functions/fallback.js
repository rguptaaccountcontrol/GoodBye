// fallback handler function
exports.fallback = async function (context, event, callback) {
  const functions = Runtime.getFunctions();
  let path = functions['responseBuilder'].path;
  let RB = require(path);

  let Say = false;
  let Listen = true;
  let Remember = {};
  let Collect = false;
  let Tasks = false;
  let Redirect = false;
  let Handoff = false;

  console.log('Fallback Triggered.');

  const Memory = JSON.parse(event.Memory);
  console.log("Memory: " + JSON.stringify(Memory));
  const from_task = Memory.from_task;

  console.log("from_task: " + from_task);

  Say = false;
  Listen = false;
  Redirect="task://goodbye";
  await RB.responseBuilder(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
};
