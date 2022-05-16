// Abstracciones

abstract class ListItemView {
	viewModel: IViewModel; // <- Esto es el bridge

	constructor(viewModel: IViewModel) {
		this.viewModel = viewModel;
	}

	render(): void {
		console.log('default abstract render');
	}
}

interface IViewModel {
	title(): string;
	image(): string;
}

// With all this data now we can create the concretions

class WithThumbnailListItemView extends ListItemView {
	render() {
		console.log('--------------------------------------');
		console.log(`Here render amazing thumbnail: ${this.viewModel.image()}`);
		console.log(`${this.viewModel.title()}`);
		console.log('--------------------------------------');
		console.log(' ');
	}
}

class JustTextListItemView extends ListItemView {
	render() {
		console.log('--------------------------------------');
		console.log(`Just render the title: ${this.viewModel.title()}`);
		console.log('--------------------------------------');
		console.log(' ');
	}
}

class VideoViewModel implements IViewModel {
	video: any;

	constructor(video: any) {
		this.video = video;
	}

	title(): string {
		return `(VIDEO) ${this.video.title}`;
	}

	image(): string {
		return `(VIDEO) ${this.video.image}`;
	}
}

class StreamViewModel implements IViewModel {
	stream: any;

	constructor(stream: any) {
		this.stream = stream;
	}

	title(): string {
		return `(STREAM) ${this.stream.title} Currently Viewing ${this.stream.viewers}`;
	}

	image(): string {
		return `(STREAM) ${this.stream.image}`;
	}
}

// USAGE

const content = [
	{
		type: 'video',
		title: 'This is a title',
		image: 'Amazing image',
		viewers: 10,
	},
	{
		type: 'stream',
		title: 'This is a title',
		image: 'Amazing image',
		viewers: 10,
	},
	{
		type: 'stream',
		title: 'This is a title',
		image: 'Amazing image',
		viewers: 10,
	},
	{
		type: 'video',
		title: 'This is a title',
		image: 'Amazing image',
		viewers: 10,
	},
];

let listViews: Array<ListItemView> = [];

for (const item of content) {
	if (item.type === 'video')
		listViews.push(
			Math.random() > 0.5
				? new WithThumbnailListItemView(new VideoViewModel(item))
				: new JustTextListItemView(new VideoViewModel(item)),
		);
	else if (item.type === 'stream')
		listViews.push(
			Math.random() > 0.5
				? new WithThumbnailListItemView(new StreamViewModel(item))
				: new JustTextListItemView(new StreamViewModel(item)),
		);
}

for (const view of listViews) view.render();
