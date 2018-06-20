Components Basics
Base Example
Here’s an example of a Vue component:

// Define a new component called button-counter
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
Components are reusable Vue instances with a name: in this case, <button-counter>. We can use this component as a custom element inside a root Vue instance created with new Vue:

<div id="components-demo">
  <button-counter></button-counter>
</div>
new Vue({ el: '#components-demo' })
Since components are reusable Vue instances, they accept the same options as new Vue, such as data, computed, watch, methods, and lifecycle hooks. The only exceptions are a few root-specific options like el.

Reusing Components
Components can be reused as many times as you want:

<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
Notice that when clicking on the buttons, each one maintains its own, separate count. That’s because each time you use a component, a new instance of it is created.

data Must Be a Function
When we defined the <button-counter> component, you may have noticed that data wasn’t directly provided an object, like this:

data: {
  count: 0
}
Instead, a component’s data option must be a function, so that each instance can maintain an independent copy of the returned data object:

data: function () {
  return {
    count: 0
  }
}
If Vue didn’t have this rule, clicking on one button would affect the data of all other instances, like below:

Organizing Components
It’s common for an app to be organized into a tree of nested components:

Component Tree

For example, you might have components for a header, sidebar, and content area, each typically containing other components for navigation links, blog posts, etc.

To use these components in templates, they must be registered so that Vue knows about them. There are two types of component registration: global and local. So far, we’ve only registered components globally, using Vue.component:

Vue.component('my-component-name', {
  // ... options ...
})
Globally registered components can be used in the template of any root Vue instance (new Vue) created afterwards – and even inside all subcomponents of that Vue instance’s component tree.

That’s all you need to know about registration for now, but once you’ve finished reading this page and feel comfortable with its content, we recommend coming back later to read the full guide on Component Registration.

Passing Data to Child Components with Props
Earlier, we mentioned creating a component for blog posts. The problem is, that component won’t be useful unless you can pass data to it, such as the title and content of the specific post we want to display. That’s where props come in.

Props are custom attributes you can register on a component. When a value is passed to a prop attribute, it becomes a property on that component instance. To pass a title to our blog post component, we can include it in the list of props this component accepts, using a props option:

Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
A component can have as many props as you’d like and by default, any value can be passed to any prop. In the template above, you’ll see that we can access this value on the component instance, just like with data.

Once a prop is registered, you can pass data to it as a custom attribute, like this:

<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
In a typical app, however, you’ll likely have an array of posts in data:

new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
Then want to render a component for each one:

<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
Above, you’ll see that we can use v-bind to dynamically pass props. This is especially useful when you don’t know the exact content you’re going to render ahead of time, like when fetching posts from an API.

That’s all you need to know about props for now, but once you’ve finished reading this page and feel comfortable with its content, we recommend coming back later to read the full guide on Props.

A Single Root Element
When building out a <blog-post> component, your template will eventually contain more than just the title:

<h3>{{ title }}</h3>
At the very least, you’ll want to include the post’s content:

<h3>{{ title }}</h3>
<div v-html="content"></div>
If you try this in your template however, Vue will show an error, explaining that every component must have a single root element. You can fix this error by wrapping the template in a parent element, such as:

<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>
As our component grows, it’s likely we’ll not only need the title and content of a post, but also the published date, comments, and more. Defining a prop for each related piece of information could become very annoying:

<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
  v-bind:content="post.content"
  v-bind:publishedAt="post.publishedAt"
  v-bind:comments="post.comments"
></blog-post>
So this might be a good time to refactor the <blog-post> component to accept a single post prop instead:

<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
The above example and some future ones use JavaScript’s template literal to make multi-line templates more readable. These are not supported by Internet Explorer (IE), so if you must support IE and are not transpiling (e.g. with Babel or TypeScript), use newline escapes instead.

Now, whenever a new property is added to post objects, it will automatically be available inside <blog-post>.

Sending Messages to Parents with Events
As we develop our <blog-post> component, some features may require communicating back up to the parent. For example, we may decide to include an accessibility feature to enlarge the text of blog posts, while leaving the rest of the page its default size:

In the parent, we can support this feature by adding a postFontSize data property:

new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [/* ... */],
    postFontSize: 1
  }
})
Which can be used in the template to control the font size of all blog posts:

<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
    ></blog-post>
  </div>
</div>
Now let’s add a button to enlarge the text right before the content of every post:

Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button>
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})
The problem is, this button doesn’t do anything:

<button>
  Enlarge text
</button>
When we click on the button, we need to communicate to the parent that it should enlarge the text of all posts. Fortunately, Vue instances provide a custom events system to solve this problem. To emit an event to the parent, we can call the built-in $emit method, passing the name of the event:

<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
Then on our blog post, we can listen for this event with v-on, just as we would with a native DOM event:

<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
Emitting a Value With an Event
It’s sometimes useful to emit a specific value with an event. For example, we may want the <blog-post> component to be in charge of how much to enlarge the text by. In those cases, we can use $emit‘s 2nd parameter to provide this value:

<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
Then when we listen to the event in the parent, we can access the emitted event’s value with $event:

<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
Or, if the event handler is a method:

<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>
Then the value will be passed as the first parameter of that method:

methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
Using v-model on Components
Custom events can also be used to create custom inputs that work with v-model. Remember that:

<input v-model="searchText">
does the same thing as:

<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
When used on a component, v-model instead does this:

<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
For this to actually work though, the <input> inside the component must:

Bind the value attribute to a value prop
On input, emit its own custom input event with the new value
Here’s that in action:

Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
Now v-model should work perfectly with this component:

<custom-input v-model="searchText"></custom-input>
That’s all you need to know about custom component events for now, but once you’ve finished reading this page and feel comfortable with its content, we recommend coming back later to read the full guide on Custom Events.

Content Distribution with Slots
Just like with HTML elements, it’s often useful to be able to pass content to a component, like this:

<alert-box>
  Something bad happened.
</alert-box>
Which might render something like:

Fortunately, this task is made very simple by Vue’s custom <slot> element:

Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
As you’ll see above, we just add the slot where we want it to go – and that’s it. We’re done!

That’s all you need to know about slots for now, but once you’ve finished reading this page and feel comfortable with its content, we recommend coming back later to read the full guide on Slots.

Dynamic Components
Sometimes, it’s useful to dynamically switch between components, like in a tabbed interface:

The above is made possible by Vue’s <component> element with the is special attribute:

<!-- Component changes when currentTabComponent changes -->
<component v-bind:is="currentTabComponent"></component>
In the example above, currentTabComponent can contain either:

the name of a registered component, or
a component’s options object
See this fiddle to experiment with the full code, or this version for an example binding to a component’s options object, instead of its registered name.

That’s all you need to know about dynamic components for now, but once you’ve finished reading this page and feel comfortable with its content, we recommend coming back later to read the full guide on Dynamic & Async Components.

DOM Template Parsing Caveats
Some HTML elements, such as <ul>, <ol>, <table> and <select> have restrictions on what elements can appear inside them, and some elements such as <li>, <tr>, and <option> can only appear inside certain other elements.

This will lead to issues when using components with elements that have such restrictions. For example:

<table>
  <blog-post-row></blog-post-row>
</table>
The custom component <blog-post-row> will be hoisted out as invalid content, causing errors in the eventual rendered output. Fortunately, the is special attribute offers a workaround:

<table>
  <tr is="blog-post-row"></tr>
</table>
It should be noted that this limitation does not apply if you are using string templates from one of the following sources:

String templates (e.g. template: '...')
Single-file (.vue) components
<script type="text/x-template">
That’s all you need to know about dynamic components for now – and actually, the end of Vue’s Essentials. Congratulations! There’s still more to learn, but first, we recommend taking a break to play with Vue yourself and build something fun.

Once you feel comfortable with the knowledge you’ve just digested, we recommend coming back to read the full guide on Dynamic & Async Components, as well as the other pages in the Components In-Depth section of the sidebar.


组件基础
基本示例
这里有一个 Vue 组件的示例：

// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
组件是可复用的 Vue 实例，且带有一个名字：在这个例子中是 <button-counter>。我们可以在一个通过 new Vue 创建的 Vue 根实例中，把这个组件作为自定义元素来使用：

<div id="components-demo">
  <button-counter></button-counter>
</div>
new Vue({ el: '#components-demo' })
因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。

组件的复用
你可以将组件进行任意次数的复用：

<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
注意当点击按钮时，每个组件都会各自独立维护它的 count。因为你每用一次组件，就会有一个它的新实例被创建。

data 必须是一个函数
当我们定义这个 <button-counter> 组件时，你可能会发现它的 data 并不是像这样直接提供一个对象：

data: {
  count: 0
}
取而代之的是，一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝：

data: function () {
  return {
    count: 0
  }
}
如果 Vue 没有这条规则，点击一个按钮就可能会像如下代码一样影响到其它所有实例：

组件的组织
通常一个应用会以一棵嵌套的组件树的形式来组织：

Component Tree

例如，你可能会有页头、侧边栏、内容区等组件，每个组件又包含了其它的像导航链接、博文之类的组件。

为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。这里有两种组件的注册类型：全局注册和局部注册。至此，我们的组件都只是通过 Vue.component 全局注册的：

Vue.component('my-component-name', {
  // ... options ...
})
全局注册的组件可以用在其被注册之后的任何 (通过 new Vue) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。

到目前为止，关于组件注册你需要了解的就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把组件注册读完。

通过 Prop 向子组件传递数据
早些时候，我们提到了创建一个博文组件的事情。问题是如果你不能向这个组件传递某一篇博文的标题或内容之类的我们想展示的数据的话，它是没有办法使用的。这也正是 prop 的由来。

Prop 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。为了给博文组件传递一个标题，我们可以用一个 props 选项将其包含在该组件可接受的 prop 列表中：

Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 data 中的值一样。

一个 prop 被注册之后，你就可以像这样把数据作为一个自定义特性传递进来：

<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
然而在一个典型的应用中，你可能在 data 里有一个博文的数组：

new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
并想要为每篇博文渲染一个组件：

<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
如上所示，你会发现我们可以使用 v-bind 来动态传递 prop。这在你一开始不清楚要渲染的具体内容，比如从一个 API 获取博文列表的时候，是非常有用的。

到目前为止，关于 prop 你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把 prop 读完。

单个根元素
当构建一个 <blog-post> 组件时，你的模板最终会包含的东西远不止一个标题：

<h3>{{ title }}</h3>
最最起码，你会包含这篇博文的正文：

<h3>{{ title }}</h3>
<div v-html="content"></div>
然而如果你在模板中尝试这样写，Vue 会显示一个错误，并解释道 every component must have a single root element (每个组件必须只有一个根元素)。你可以将模板的内容包裹在一个父元素内，来修复这个问题，例如：

<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>
看起来当组件变得越来越复杂的时候，我们的博文不只需要标题和内容，还需要发布日期、评论等等。为每个相关的信息定义一个 prop 会变得很麻烦：

<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
  v-bind:content="post.content"
  v-bind:publishedAt="post.publishedAt"
  v-bind:comments="post.comments"
></blog-post>
所以是时候重构一下这个 <blog-post> 组件了，让它变成接受一个单独的 post prop：

<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
上述的这个和一些接下来的示例使用了 JavaScript 的模板字符串来让多行的模板更易读。它们在 IE 下并没有被支持，所以如果你需要在不 (经过 Babel 或 TypeScript 之类的工具) 编译的情况下支持 IE，请使用折行转义字符取而代之。

现在，不论何时为 post 对象添加一个新的属性，它都会自动地在 <blog-post> 内可用。

通过事件向父级组件发送消息
在我们开发 <blog-post> 组件时，它的一些功能可能要求我们和父级组件进行沟通。例如我们可能会引入一个可访问性的功能来放大博文的字号，同时让页面的其它部分保持默认的字号。

在其父组件中，我们可以通过添加一个 postFontSize 数据属性来支持这个功能：

new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [/* ... */],
    postFontSize: 1
  }
})
它可以在模板中用来控制所有博文的字号：

<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
    ></blog-post>
  </div>
</div>
现在我们在每篇博文正文之前添加一个按钮来放大字号：

Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button>
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})
问题是这个按钮不会做任何事：

<button>
  Enlarge text
</button>
当点击这个按钮时，我们需要告诉父级组件放大所有博文的文本。幸好 Vue 实例提供了一个自定义事件的系统来解决这个问题。我们可以调用内建的 $emit 方法并传入事件的名字，来向父级组件触发一个事件：

<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
然后我们可以用 v-on 在博文组件上监听这个事件，就像监听一个原生 DOM 事件一样：

<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
使用事件抛出一个值
有的时候用一个事件来抛出一个特定的值是非常有用的。例如我们可能想让 <blog-post> 组件决定它的文本要放大多少。这时可以使用 $emit 的第二个参数来提供这个值：

<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
然后当在父级组件监听这个事件的时候，我们可以通过 $event 访问到被抛出的这个值：

<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
或者，如果这个事件处理函数是一个方法：

<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>
那么这个值将会作为第一个参数传入这个方法：

methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
在组件上使用 v-model
自定义事件也可以用于创建支持 v-model 的自定义输入组件。记住：

<input v-model="searchText">
等价于：

<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
当用在组件上时，v-model 则会这样：

<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
为了让它正常工作，这个组件内的 <input> 必须：

将其 value 特性绑定到一个名叫 value 的 prop 上
在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
写成代码之后是这样的：

Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
现在 v-model 就应该可以在这个组件上完美地工作起来了：

<custom-input v-model="searchText"></custom-input>
到目前为止，关于组件自定义事件你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把自定义事件读完。

通过插槽分发内容
和 HTML 元素一样，我们经常需要向一个组件传递内容，像这样：

<alert-box>
  Something bad happened.
</alert-box>
可能会渲染出这样的东西：

幸好，Vue 自定义的 <slot> 元素让这变得非常简单：

Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
如你所见，我们只要在需要的地方加入插槽就行了——就这么简单！

到目前为止，关于插槽你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把插槽读完。

动态组件
有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里：

上述内容可以通过 Vue 的 <component> 元素加一个特殊的 is 特性来实现：

<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
在上述示例中，currentTabComponent 可以包括

已注册组件的名字，或
一个组件的选项对象
你可以在这里查阅并体验完整的代码，或在这个版本了解绑定组件选项对象，而不是已注册组件名的示例。

到目前为止，关于动态组件你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把动态和异步组件读完。

解析 DOM 模板时的注意事项
有些 HTML 元素，诸如 <ul>、<ol>、<table> 和 <select>，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 <li>、<tr> 和 <option>，只能出现在其它某些特定的元素内部。

这会导致我们使用这些有约束条件的元素时遇到一些问题。例如：

<table>
  <blog-post-row></blog-post-row>
</table>
这个自定义组件 <blog-post-row> 会被作为无效的内容提升到外部，并导致最终渲染结果出错。幸好这个特殊的 is 特性给了我们一个变通的办法：

<table>
  <tr is="blog-post-row"></tr>
</table>
需要注意的是如果我们从以下来源使用模板的话，这条限制是不存在的：

字符串 (例如：template: '...')
单文件组件 (.vue)
<script type="text/x-template">
到这里，你需要了解的解析 DOM 模板时的注意事项——实际上也是 Vue 的全部必要内容，大概就是这些了。恭喜你！接下来还有很多东西要去学习，不过首先，我们推荐你先休息一下，试用一下 Vue，自己随意做些好玩的东西。

如果你感觉已经掌握了这些知识，我们推荐你再回来把完整的组件指南，包括侧边栏中组件深入章节的所有页面读完。