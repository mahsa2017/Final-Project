import React, { Component } from 'react'
import { Table, Rating, Image, Pagination} from 'semantic-ui-react'
import fakeAlbums from '../data/fakeAlbums.json'
import './TableElement.css'
import _ from 'lodash'


export default class TableElement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			column: null,
			data: fakeAlbums,
			direction: null,
		}
		this.handleSort = this.handleSort.bind(this)
	};

	handleSort = clickedColumn => () => {
		const { column, data, direction } = this.state
		if (column !== clickedColumn) {
			this.setState({
				column: clickedColumn,
				data: _.sortBy(data, [clickedColumn]),
				direction: 'ascending',
			})
			return
		}
		this.setState({
			data: data.reverse(),
			direction: direction === 'ascending' ? 'descending' : 'ascending',
		})
	}
	render() {

		const { column, direction } = this.state;

		const renderBodyRow = ({ cover, artist, title, year, rating, id }, i) => ({
			key: `result-row-${i}`,
			cells: [
				<td><Image src={cover} size='tiny' verticalAlign='middle' bordered /></td>,
				{ content: artist, width: '1' },
				{ content: title },
				{ content: year, width: '1' },
				<td><Rating icon='star' defaultRating={rating} maxRating={5} 
				size='small' disabled='true' /></td>,
				{ content: id, width: '1' }
			],
		});

		const headerRow = [
			{ content: 'Cover' },
			{ content: 'Artist', sorted: column === 'artist' ? direction : null,
			 onClick: this.handleSort('artist'),
			  className: column === 'artist' ? `sorted ${direction}` : `sorted ${null}` },
			{ content: 'Title', sorted: column === 'title' ? direction : null,
			 onClick: this.handleSort('title'),
			  className: column === 'title' ? `sorted ${direction}` : `sorted ${null}` },
			{ content: 'Year', sorted: column === 'year' ? direction : null,
			 onClick: this.handleSort('year'), 
			 className: column === 'year' ? `sorted ${direction}` : `sorted ${null}` },
			{ content: 'Rating' },
			{ content: 'Catalog #' }
		]

		return (
			<div>
			<Table singleLine sortable
				verticalAlign='middle' textAlign='center'
				headerRow={headerRow}
				renderBodyRow={renderBodyRow}
				tableData={this.state.data}
				 />
				<Pagination defaultActivePage={5} totalPages={10} />
	</div>
		)
	}
}

