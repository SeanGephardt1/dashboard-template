import React from 'react';
import './lorum-ipsum.css';

export default class LorumContent extends React.Component
{
	static defaultProps = {
		SimpleContent: ( "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at faucibus felis. Nulla faucibus elit vel mollis finibus. Maecenas metus lacus, consectetur quis turpis ac, sollicitudin dapibus ipsum. Maecenas hendrerit turpis a neque scelerisque rhoncus. Pellentesque lobortis arcu sed mauris porttitor, id accumsan est aliquet. Vivamus congue quam neque, ac fermentum orci rhoncus ac. Quisque in metus eros. Nullam luctus ex urna, sed bibendum metus fringilla sed."),
		ComplexContent: (
			<div>
                <h1>Header level 1</h1>
                <h2>Header Level 2</h2>
                <h3>Header Level 3</h3>
                <h4>Header Level 4</h4>
                <h5>Header Level 5</h5>
                <h6>Header Level 6</h6>
                <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href='https://portal.azure.com'>Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
                <table className='demo-table' cellPadding='0' cellSpacing='0'>
                    <thead>
                        <tr>
                            <td>Name&uarr;&darr;</td>
                            <td>Name&uarr;&darr;</td>
                            <td>Name&uarr;&darr;</td>
                            <td>Name&uarr;&darr;</td>
                            <td>Name&uarr;&darr;</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Value</td>
                            <td>Value</td>
                            <td>Value</td>
                            <td>Value</td>
                            <td>Value</td>
                        </tr>
                        <tr>
                            <td>Value</td>
                            <td>Value</td>
                            <td>Value</td>
                            <td>Value</td>
                            <td>Value</td>
                        </tr>
                        <tr>
                            <td>Value</td>
                            <td>Value</td>
                            <td>Value</td>
                            <td>Value</td>
                            <td>Value</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan='5'>Copyright &copy; 1900-2100 Sean Corporation</td>
                        </tr>
                    </tfoot>
                </table>

                <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href='https://portal.azure.com'>Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

                <ol>
                    <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                    <li>Aliquam tincidunt mauris eu risus.</li>
                    <li>Aliquam tincidunt mauris eu risus.</li>
                    <ol>
                        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                        <li>Aliquam tincidunt mauris eu risus.</li>
                        <li>Aliquam tincidunt mauris eu risus.</li>
                        <ol>
                            <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                            <li>Aliquam tincidunt mauris eu risus.</li>
                            <li>Aliquam tincidunt mauris eu risus.</li>
                        </ol>
                    </ol>
                </ol>
                <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href='https://portal.azure.com'>Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

                <ul>
                    <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                    <li>Aliquam tincidunt mauris eu risus.</li>
                    <li>Aliquam tincidunt mauris eu risus.</li>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                        <li>Aliquam tincidunt mauris eu risus.</li>
                        <li>Aliquam tincidunt mauris eu risus.</li>
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                            <li>Aliquam tincidunt mauris eu risus.</li>
                            <li>Aliquam tincidunt mauris eu risus.</li>
                        </ul>
                    </ul>
                </ul>
            </div>
        ),
		NirvanaAboutAGirl:
        (
            <div>
                <h1>About a girl</h1>
                <br />

                <div>I need an easy friend</div>
                <div>I do, with an ear to lend</div>
                <div>I don't think you fit this shoe</div>
                <div>I do, won't you have a clue</div>

                <br/>
                <div>I'll take advantage while</div>
                <div>You hang me out to dry</div>
                <div>But I can't see you every night</div>
                <div>Free</div>

                <br/>
                <div>I'm standing in your line</div>
                <div>I do hope you have the time</div>
                <div>I do pick a number too</div>
                <div>I do keep a date with you</div>

                <br/>
                <div>I'll take advantage while</div>
                <div>You hang me out to dry</div>
                <div>But I can't see you every night</div>
                <div>Free</div>

                <br/>
                <div>I need an easy friend</div>
                <div>I do whip her in to land</div>
                <div>I do think you fit this shoe</div>
                <div>I do won't you have a clue</div>

                <br/>
                <div>I'll take advantage while</div>
                <div>You hang me out to dry</div>
                <div>But I can't see you every night</div>
                <div>No I can't see you every night</div>
                <div>Free</div>

                <br/>
                <div>I do</div>
                <div>I do</div>
                <div>I do</div>
                <div>I do</div>

                <div>I need an easy friend</div>
                <div>I do, with an ear to lend</div>
                <div>I don't think you fit this shoe</div>
                <div>I do, won't you have a clue</div>

                <br/>
                <div>I'll take advantage while</div>
                <div>You hang me out to dry</div>
                <div>But I can't see you every night</div>
                <div>Free</div>

                <br/>
                <div>I'm standing in your line</div>
                <div>I do hope you have the time</div>
                <div>I do pick a number too</div>
                <div>I do keep a date with you</div>

                <br/>
                <div>I'll take advantage while</div>
                <div>You hang me out to dry</div>
                <div>But I can't see you every night</div>
                <div>Free</div>

                <br/>
                <div>I need an easy friend</div>
                <div>I do whip her in to land</div>
                <div>I do think you fit this shoe</div>
                <div>I do won't you have a clue</div>

                <br/>
                <div>I'll take advantage while</div>
                <div>You hang me out to dry</div>
                <div>But I can't see you every night</div>
                <div>No I can't see you every night</div>
                <div>Free</div>

                <br/>
                <div>I do</div>
                <div>I do</div>
                <div>I do</div>
                <div>I do</div>
            </div>
        ),
        DeclarationOfIndependence: (
            <div className="cp-doi">
				<h1>Declaration of Independence: A Transcription</h1>

				<p><em>Note: The following text is a transcription of the Stone Engraving of the parchment Declaration of Independence (the document on display in <a href="https://museum.archives.gov/founding-documents">the Rotunda at the National Archives Museum</a>.)&nbsp;The spelling and punctuation reflects the original.</em></p>

				<p className="cp-doi-larger">In Congress, July 4, 1776</p>

				<p><strong>The unanimous Declaration of the thirteen united States of America,</strong> When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature's God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.</p>

				<p>We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed, --That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their Safety and Happiness. Prudence, indeed, will dictate that Governments long established should not be changed for light and transient causes; and accordingly all experience hath shewn, that mankind are more disposed to suffer, while evils are sufferable, than to right themselves by abolishing the forms to which they are accustomed. But when a long train of abuses and usurpations, pursuing invariably the same Object evinces a design to reduce them under absolute Despotism, it is their right, it is their duty, to throw off such Government, and to provide new Guards for their future security.--Such has been the patient sufferance of these Colonies; and such is now the necessity which constrains them to alter their former Systems of Government. The history of the present King of Great Britain is a history of repeated injuries and usurpations, all having in direct object the establishment of an absolute Tyranny over these States. To prove this, let Facts be submitted to a candid world.</p>

				<p>In every stage of these Oppressions We have Petitioned for Redress in the most humble terms: Our repeated Petitions have been answered only by repeated injury. A Prince whose character is thus marked by every act which may define a Tyrant, is unfit to be the ruler of a free people.</p>

				<p>Nor have We been wanting in attentions to our Brittish brethren. We have warned them from time to time of attempts by their legislature to extend an unwarrantable jurisdiction over us. We have reminded them of the circumstances of our emigration and settlement here. We have appealed to their native justice and magnanimity, and we have conjured them by the ties of our common kindred to disavow these usurpations, which, would inevitably interrupt our connections and correspondence. They too have been deaf to the voice of justice and of consanguinity. We must, therefore, acquiesce in the necessity, which denounces our Separation, and hold them, as we hold the rest of mankind, Enemies in War, in Peace Friends.</p>

				<p>We, therefore, the Representatives of the united States of America, in General Congress, Assembled, appealing to the Supreme Judge of the world for the rectitude of our intentions, do, in the Name, and by Authority of the good People of these Colonies, solemnly publish and declare, That these United Colonies are, and of Right ought to be Free and Independent States; that they are Absolved from all Allegiance to the British Crown, and that all political connection between them and the State of Great Britain, is and ought to be totally dissolved; and that as Free and Independent States, they have full Power to levy War, conclude Peace, contract Alliances, establish Commerce, and to do all other Acts and Things which Independent States may of right do. And for the support of this Declaration, with a firm reliance on the protection of divine Providence, we mutually pledge to each other our Lives, our Fortunes and our sacred Honor.</p>

					<div className="doi-sig-panel">
								<div>
										<p><strong>Georgia</strong></p>
										<p>Button Gwinnett</p>
										<p>Lyman Hall</p>
										<p>George Walton</p>
										<p>&nbsp;</p>
										<p><strong>North Carolina</strong></p>
										<p>William Hooper</p>
										<p>Joseph Hewes</p>
										<p>John Penn</p>
										<p>&nbsp;</p>
										<p><strong>South Carolina</strong></p>
										<p>Edward Rutledge</p>
										<p>Thomas Heyward, Jr.</p>
										<p>Thomas Lynch, Jr.</p>
										<p>Arthur Middleton</p>
										<p>&nbsp;</p>
										<p><strong>Massachusetts</strong></p>
										<p>John Hancock</p>
									</div>

								<div>
										<p><strong>Maryland</strong></p>
										<p>Samuel Chase</p>
										<p>William Paca</p>
										<p>Thomas Stone</p>
										<p>Charles Carroll of Carrollton</p>
										<p>&nbsp;</p>
										<p><strong>Virginia</strong></p>
										<p>George Wythe</p>
										<p>Richard Henry Lee</p>
										<p>Thomas Jefferson</p>
										<p>Benjamin Harrison</p>
										<p>Thomas Nelson, Jr.</p>
										<p>Francis Lightfoot Lee</p>
										<p>Carter Braxton</p>
										<p>&nbsp;</p>
										<p><strong>Pennsylvania</strong></p>
										<p>Robert Morris</p>
										<p>Benjamin Rush</p>
										<p>Benjamin Franklin</p>
										<p>John Morton</p>
										<p>George Clymer</p>
										<p>James Smith</p>
										<p>George Taylor</p>
										<p>James Wilson</p>
										<p>George Ross</p>
									</div>

								<div>
										<p><strong>Delaware</strong></p>
										<p>Caesar Rodney</p>
										<p>George Read</p>
										<p>Thomas McKean</p>
										<p>&nbsp;</p>
										<p><strong>New York</strong></p>
										<p>William Floyd</p>
										<p>Philip Livingston</p>
										<p>Francis Lewis</p>
										<p>Lewis Morris</p>
										<p>&nbsp;</p>
										<p><strong>New Jersey</strong></p>
										<p>Richard Stockton</p>
										<p>John Witherspoon</p>
										<p>Francis Hopkinson</p>
										<p>John Hart</p>
										<p>Abraham Clark</p>
										<p>&nbsp;</p>
										<p><strong>New Hampshire</strong></p>
										<p>Josiah Bartlett</p>
										<p>William Whipple</p>
										<p>&nbsp;</p>
									</div>

								<div>
										<p><strong>Massachusetts</strong></p>
										<p>Samuel Adams</p>
										<p>John Adams</p>
										<p>Robert Treat Paine</p>
										<p>Elbridge Gerry</p>
										<p>&nbsp;</p>
										<p><strong>Rhode Island</strong></p>
										<p>Stephen Hopkins</p>
										<p>William Ellery</p>
										<p>&nbsp;</p>
										<p><strong>Connecticut</strong></p>
										<p>Roger Sherman</p>
										<p>Samuel Huntington</p>
										<p>William Williams</p>
										<p>Oliver Wolcott</p>
										<p>&nbsp;</p>
										<p><strong>New Hampshire</strong></p>
										<p>Matthew Thornton</p>
									</div>

							</div>
			{ /* END CONTENT*/}
			</div>			 
        )
	};
	constructor( props )
	{
        super( props );
        this.Content = ( this.props.content || LorumContent.defaultProps.SimpleContent );
        return;
	};
	render()
	{	
		return (
			<div className="content-lorum-ipsum-panel">{ this.Content }</div>
		);
	};
};