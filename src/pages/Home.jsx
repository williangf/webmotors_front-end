import React from 'react';
import './Home.scss';
import api from '../services/api';
import CustomSelect from '../components/custom-select/CustomSelect';
import Logo from '../assets/img/logo.png';
import Car from '../components/icons/Car';
import Bike from '../components/icons/Bike';
import Marker from '../components/icons/Marker';

class Home extends React.Component {

	constructor() {
		super()
		this.state = {
			address: '',
			selectedMake: { ID: 0, Name: 'Todas' },
			selectedModel: { ID: 0, Name: 'Todos' },
			selectedVersion: { ID: 0, Name: 'Todas' },
			makes: null,
			models: null,
			versions: null,
		}
	}

	componentDidMount() {
		api.get('Make').then(res => {
			this.setState({ makes: res.data });
		})
	}

	changeValue = (field, value) => {

		if (value !== 0) {
			if (field === 'Make') {
				api.get('Model', { params: { MakeID: value.ID } }).then(res => {
					this.setState({
						models: res.data,
						selectedMake: value,
						selectedModel: { ID: 0, Name: 'Todos' },
						selectedVersion: { ID: 0, Name: 'Todas' },
					});
				});
			}
			if (field === 'Model') {
				api.get('Version', { params: { ModelID: value.ID } }).then(res => {
					this.setState({
						versions: res.data,
						selectedModel: value,
						selectedVersion: { ID: 0, Name: 'Todas' },
					});
				});
			}
		} else {
			if (field === 'Make') {
				this.setState({
					selectedMake: { ID: 0, Name: 'Todas' },
					selectedModel: { ID: 0, Name: 'Todos' },
					selectedVersion: { ID: 0, Name: 'Todas' },
					models: null,
					versions: null
				});
			}
			if (field === 'Model') {
				this.setState({
					selectedModel: { ID: 0, Name: 'Todos' },
					selectedVersion: { ID: 0, Name: 'Todas' },
					versions: null
				});
			}
		}

		if (field === 'Version') {
			this.setState({ selectedVersion: value });
		}


	};

	render() {

		const { address, selectedMake, selectedModel, selectedVersion, makes, models, versions } = this.state;

		return (
			<div className="home-container">
				<header className="header">
					<a href="/" className="header__link-logo">
						<img src={Logo} alt="Webmotors" title="Webmotors" className="header__logo" />
					</a>
				</header>
				<main className="search-box">
					<div className="search-box__header">
						<div className="search-box__tabs">
							<div className="search-box__tab active">
								<div className="search-box__tab-icon search-box__tab-icon--car">
									<Car width="40px" />
								</div>
								<div className="search-box__tab-labels">
									<span className="search-box__tab-title">Comprar</span>
									<span className="search-box__tab-title search-box__tab-title--large">Carros</span>
								</div>
							</div>
							<div className="search-box__tab">
								<div className="search-box__tab-icon">
									<Bike width="32px" />
								</div>
								<div className="search-box__tab-labels">
									<span className="search-box__tab-title">Comprar</span>
									<span className="search-box__tab-title search-box__tab-title--large">Motos</span>
								</div>
							</div>
						</div>
						<a href="/" className="search-box__sell-link" >
							Vender meu carro
						</a>
					</div>
					<form action="">
						<div className="search-box__content">
							<div className="search-box__checkbox">
								<label className="container">
									<span>Novos</span>
									<input type="checkbox" defaultChecked={true} />
									<span className="checkmark"></span>
								</label>
								<label className="container">
									<span>Usados</span>
									<input type="checkbox" />
									<span className="checkmark"></span>
								</label>
							</div>
							<div className="search-box__content-group">
								<div className="search-box__input search-box__input--with-icon">
									<input id="endereco" type="text" value={address} onChange={e => this.setState({ address: e.target.value })} />
									<span className="search-box__input-icon"><Marker width="20px" /></span>
									<i onClick={() => this.setState({ address: '' })} className="search-box__input-clear fas fa-times-circle"></i>
									<label className="search-box__input-label search-box__input-label--with-icon">Onde:</label>
								</div>
								<div className="search-box__half-block--location">
									<CustomSelect label="Raio:" defaultValue="100km" padding={50} />
								</div>
								<div className="search-box__half-block">
									<CustomSelect label="Ano Desejado" />
								</div>
								<div className="search-box__half-block search-box__half-block--with-margin">
									<CustomSelect label="Faixa de Preço" />
								</div>
							</div>
							<div className="search-box__content-group search-box__content-group--with-margin">
								<div className="search-box__half-block">
									<CustomSelect value={selectedMake} defaultValue="Todas" changeValue={this.changeValue} id="Make" label="Marca:" options={makes} padding={60} />
								</div>
								<div className="search-box__half-block search-box__half-block--with-margin">
									<CustomSelect disabled={selectedMake.ID === 0 ? true : false} value={selectedModel} defaultValue="Todos" changeValue={this.changeValue} id="Model" label="Modelo:" options={models} padding={68} />
								</div>
								<div className="search-box__full-block">
									<CustomSelect disabled={selectedModel.ID === 0 ? true : false} value={selectedVersion} defaultValue="Todas" changeValue={this.changeValue} id="Version" label="Versão:" options={versions} padding={64} />
								</div>
							</div>
							<div className="search-box__footer">
								<a className="search-box__footer-link" href="/"><i className="fas fa-chevron-right"></i> Busca Avançada</a>
								<a className="search-box__clean-form" href="/">Limpar filtros</a>
								<a className="search-box__submit" href="/">Ver ofertas</a>
							</div>
						</div>
					</form>
				</main>
			</div>
		)

	}

}

export default Home;