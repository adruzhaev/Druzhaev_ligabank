import {CreditCalculation} from "../../components/CreditCalculation/CreditCalculation";
import {ConverterCounter} from "../../components/ConverterCounter/ConverterCounter"
import {Footer} from "../../components/common/Footer/Footer";
import {Header} from "../../components/common/Header/Header";
import {memo} from "react";

export const CurrencyConverter = memo(function CurrencyConverter({className}) {
	return <div className={className}>
		<Header />
		<CreditCalculation />
		<ConverterCounter />
		<Footer />
	</div>
});
