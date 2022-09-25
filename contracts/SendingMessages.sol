// SPDX-License-Identifier: MIT
pragma solidity 0.8;

// @ Features:
// creating an message cost an transaction fee
// sending messages cost an gas fee but every month u get the charge of gas
// or u can pick how u would like to be charge: monthly, every message sent, or weekly
// get they addresses or you can get it by they usersname they create for the app
// why would someone wanna use this, it's decentralized and no one can't track anything you talk about 


contract SendingMessages {
    /* State */
    // I'm setting the amount of ether to take for each transactions fee
    address public immutable i_owner;
    string  public messageSent;
    /* Events */
    event Delete(string indexed _messages);
    // event Request(address indexed _from, address _to, string _messages);
    event Messaging(address indexed _from, address _to, string _messages);


    /* Errors */
    error Friends__AlreadyFriends();

    /* Constructor */
    constructor(){
        i_owner = msg.sender;
    }

    /* Struct */
    struct Message{
        address account;
        string message;
    }
    
    /* Mappings */
    mapping(uint256 => address) public accounts;
    mapping(address => mapping(address => bool)) public isFriends;

    /* Array */
    Message[] private message;

    /* Modifier */

    /* Functions */
    // We trying to return the addresses or users
    // sumthing like filtering out the address or users for this function  
    // so like adding a friend and be able to send an message or sumthing
    // function sendFriendRequest(address _to, string memory _message) external {
    // emit Request(msg.sender, _to, _message);
    // }

    // Sending an message
    function sendAnMessage(address _to,  string memory _message) external payable  {
        messageSent  = _message;
        message.push(Message(_to, _message));
        isFriends[_to];
        emit Messaging(msg.sender, _to, _message);
    }

    function getMessage() public view returns(string memory){
        return messageSent;
    }

    function deleteAnMessage(string memory _message) external {
        messageSent = _message;
        delete _message;
        emit Delete( _message); 
    }

    // have the owner to be able to withdraw the transactions
    function withdraw() public {
        require(msg.sender == i_owner, "You are not the owner sorry!");
        (bool withdrawed,) = msg.sender.call{value: address(this).balance}("");
        require(withdrawed, "Failed withdraw");
    }


    receive() external payable{}
    fallback() external payable{}
}