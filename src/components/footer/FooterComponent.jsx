import "../../styles/footer.css"

export const FooterComponent = () => {
    return (
        <footer>
            <div className="footerRights">
                <p>ООО "ЕСА"  89832707050.</p>
            </div>
            
            <div className="footerLinks">
                <div className="footerNav">
                    <a>О нас</a>
                    <a>Продукция</a>
                    <a>Политика конфиденциальности</a>
                    <a>Условия использования</a>
                    <a>Поддержка</a>
                </div>

                <div className="footerDivider"></div>
            </div>
        </footer>
    )
}