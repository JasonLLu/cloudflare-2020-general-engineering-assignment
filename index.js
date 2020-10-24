addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event));
});

const links=[
  {
    "name": "My Recent First Research Paper! (PDF Download)",
    "url": "https://www.editorialmanager.com/trd/download.aspx?id=38006&guid=%7B4A505ED7-0FCD-4921-8A81-49653C543DC9%7D&scheme=1"
  },
  {
    "name": "An Anonymous Social Media Website My Friends And I Are Working On",
    "url": "https://wallfly-web.herokuapp.com/#/"
  },
  {
    "name": "Leetcode Profile",
    "url": "https://leetcode.com/jasonlu7345/"
  }
]

const socialLinks = [
	{
		url: 'https://www.linkedin.com/in/jason-lu-147400186/',
		svg: 'https://simpleicons.org/icons/linkedin.svg',
	},
	{
		url: 'https://github.com/JasonLLu',
		svg: 'https://simpleicons.org/icons/github.svg',
	},
	{
		url: 'https://www.facebook.com/jason.lu.10236/',
		svg: 'https://simpleicons.org/icons/facebook.svg',
	},
]

class LinksTransformer {
  constructor(links) {
    this.links = links
  }

  async element(element) {
    links.forEach(link => {
      element.append(
        `<a href="${link.url}">${link.name}</a>`,
        { html: true }
      );
    })
  }
}



class SocialLinksTransformer {
	constructor(socialLinks) {
		this.socialLinks = socialLinks
	}
	async element(element) {
		element.removeAttribute('style');
		socialLinks.forEach((social) => {
		element.append(
		`<a href=${social.url} target="_blank">
    	      <img src=${social.svg}></img>
      	  </a>`,
			{html: true}
		)
	})
	}
}

class Title {
  async element(element) {
    element.setInnerContent("Jason Lu");
  }
}

class UserName {
  async element(element) {
    element.setInnerContent("Jason Lu");
  }
}

class Avatar {
  async element(element) {
    element.setAttribute("src", "https://media-exp1.licdn.com/dms/image/C4E03AQG3kAyl_D_b-w/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=dfqCCrjPB6bCqBKdyr9RcpLBj78OG50rMMNM3OQ9rH8");
  }
}

class Profile {
  async element(element) {
    element.removeAttribute('style');
  }
}

class BackGround {
  async element(element) {
    element.setAttribute("class", "bg-blue-500");
  }
}


async function handleRequest(event) {
	const url = new URL(event.request.url);
  let element = url.pathname.split("/").filter(n => n);

  if (element[0] === "links") {
    const json = JSON.stringify(links, null, 2);
    return new Response(json, {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    })

  } else{
    const headers = {
      headers: {
        "content-type": "text/html;charset=UTF-8"
      },
    }
    const response = await fetch("https://static-links-page.signalnerve.workers.dev/", headers)

    return new HTMLRewriter()
      .on("div#links", new LinksTransformer())
      .on("div#profile", new Profile())
      .on("img#avatar", new Avatar())
      .on("h1#name", new UserName())
      .on("title", new Title())
			.on('div#social', new SocialLinksTransformer(socialLinks))
      .on("body", new BackGround())
      .transform(response);
  } 
		
}
