const {
  BN,
  expectEvent,
  expectRevert,
  balanceOf,
  balance,
} = require("@openzeppelin/test-helpers");
const { expect, artifacts, contract } = require("hardhat");
const Messages = artifacts.require("SendingMessages");

contract("SendingMessages", (accounts) => {
  let messages;

  before(async () => {
    messages = await Messages.new();
  });

  const message = "Hello World";
  const transactioFee = 0.2;
  const owner = accounts[0];
  const sender = accounts[1];
  const receiver = accounts[2];

  it("should send an request - successful sent", async () => {
    const receipt = await messages.sendFriendRequest(receiver, message, {
      from: sender,
    });
    expectEvent(receipt, "Request", {
      _from: sender,
      _to: receiver,
      _messages: message,
    });
  });

  it("should not send message - messaged fail", async () => {
    expectRevert(
      messages.sendAnMessage(receiver, message, { from: sender }),
      "Not enought eth"
    );
  });

  it("should send the message - successful sent", async () => {
    const txRecipt = await messages.sendAnMessage(receiver, message, {
      from: sender,
    });
    expectEvent(txRecipt, "Messaging", {
      _from: sender,
      _to: receiver,
      _messages: message,
    });
  });

  it("should delete the message if clicked delete - successful deleted", async () => {
    const txDelete = await messages.deleteAnMessage(receiver, message);
    expectEvent(txDelete, "Delete", {
      _to: receiver,
      _messages: message,
    });
  });

  describe("Withdraw", () => {
    it("should revert - only owner", () => {
      return expectRevert(
        messages.withdraw({ from: owner }),
        "You are not the owner sorry!"
      );
    });
    it("should withdraw funds - withdrawed", async () => {
      return expectRevert(messages.withdraw({ from: owner }), "Failed");
    });
  });
});
