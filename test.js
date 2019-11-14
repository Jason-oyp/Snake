// function Node(value){
//     this.value = value;
//     this.next = null;
// }

// let node1 = new Node(1);
// let node2 = new Node(2);
// let node3 = new Node(3);
// let node4 = new Node(4);

// node1.next = node2;
// node2.next = node3;
// node3.next = node4;

// function nizhi (root) {
//     if(root.next.next == null){
//         root.next.next = root;
//         return root.next;
//     } else {
//         var result = nizhi(root.next);
//         root.next.next = root;
//         root.next = null;
//     }
//     return result;
// }

// console.log(nizhi(node1));

// let arr = [4,1,9,6,7,3,2,8];

// function quick (arr) {

// }

function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

let a = new Node('a');
let b = new Node('b');
let c = new Node('c');
let d = new Node('d');
let e = new Node('e');
let f = new Node('f');
let g = new Node('g');

a.left = c;
a.right = b;
c.left = f;
c.right = g;
b.left = d;
b.right = e;

// function f1 (root) {
//     if(root == null) return;

//     f1(root.left);

//     f1(root.right);
//     console.log(root.value);
// }
// f1(a);

function f1(rootList, target) {
    if (rootList == null || rootList.length == 0) return false;
    var childList = [];
    for (var i = 0; i < rootList.length; i++) {
        console.log(rootList[i].value);
        if (rootList[i] != null && rootList[i].value == target) {
            return true;
        } else {
            childList.push(rootList[i].left);
            childList.push(rootList[i].right);
        }
    }
    return childList.every(item => item === null) ? false : f1(childList, target);
}
console.log(f1([a], 'q'));